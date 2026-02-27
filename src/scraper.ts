// scraper.ts
import { chromium } from "playwright";
import { promises as fs } from "fs";
import { writeToCSV } from "./utils.js";
import type { ProductData } from "./utils.js";
import { scrapeAmazon } from "./scrapers/amazonScraper.js";
import { scrapeWalmart } from "./scrapers/walmartScraper.js";
import { logger } from "./logging/logger.js";

interface SKUItem {
  Type: "Amazon" | "Walmart";
  SKU: string;
}

async function main() {
  let browser;

  try {
    logger.info("Scraper started");

    //Read input file
    const file = await fs.readFile("skus.json", "utf-8");
    const data: { skus: SKUItem[] } = JSON.parse(file);

    logger.info("Loaded SKUs", { count: data.skus.length });

    //Launch browser
    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext({
      userAgent: "Mozilla/5.0",
      viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();

    const results: ProductData[] = [];

    for (const item of data.skus) {
      try {
        logger.info("Processing SKU", {
          sku: item.SKU,
          source: item.Type
        });

        let product: ProductData | null = null;

        if (item.Type === "Amazon") {
          product = await scrapeAmazon(page, item.SKU);
        }

        if (item.Type === "Walmart") {
          product = await scrapeWalmart(page, item.SKU);
        }

        if (product) {
          results.push(product);

          logger.info("Scraped successfully", {
            sku: item.SKU,
            source: item.Type
          });
        }

      } catch (skuError: any) {
        //Per-SKU failure — continue loop
        logger.error("Failed to scrape SKU", {
          sku: item.SKU,
          source: item.Type,
          message: skuError.message,
          stack: skuError.stack
        });
      }

      await page.waitForTimeout(2000 + Math.random() * 2000);
    }

    await writeToCSV(results, "product_data.csv");

    logger.info("CSV written successfully", {
      totalScraped: results.length
    });

  } catch (error: any) {
    logger.error("Fatal scraper error", {
      message: error.message,
      stack: error.stack
    });

  } finally {
    if (browser) {
      await browser.close();
      logger.info("Browser closed");
    }

    logger.info("Scraper finished");
  }
}

main();