// amazonScraper.ts
import type { Page } from "playwright";
import type { ProductData } from "../utils.js";
import { logger } from "../logging/logger.js";
import { ScraperError } from "../logging/errors.js";
export async function scrapeAmazon(
  page: Page,
  sku: string
): Promise<ProductData> {

    try{
        const url = `https://www.amazon.in/dp/${sku}`;
        console.log("Opening Amazon:", url);

        await page.goto(url, { waitUntil: "domcontentloaded" });

        const title = await page.locator("span#productTitle").textContent();
        const description = await page.locator("#feature-bullets").textContent();
        const price = await page
            .locator(".priceToPay .a-price-whole")
            .first()
            .textContent();
        const reviews = await page
            .locator("#acrCustomerReviewText")
            .first()
            .textContent();
        const rating = await page
            .locator("#averageCustomerReviews .a-size-small")
            .first()
            .textContent();

        return {
            sku,
            source: "Amazon",
            title: title?.trim() || "",
            description: description?.trim() || "",
            price: price || "",
            reviews: `${reviews || ""} | ${rating || ""}`
        };
    } catch (error: any) {
    logger.error("Amazon scraping failed", {
      sku,
      error: error.message,
      stack: error.stack
    });

    throw new ScraperError(error.message, sku, "Amazon");
  }
}