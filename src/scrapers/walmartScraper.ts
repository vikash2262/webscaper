// walmartScraper.ts
import type { Page } from "playwright";
import type { ProductData } from "../utils.js";

export async function scrapeWalmart(
  page: Page,
  sku: string
): Promise<ProductData> {

  const url = `https://www.walmart.com/ip/${sku}`;
  console.log("Opening Walmart:", url);

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const title = await page.locator("#main-title").textContent();
  const description = await page
    .locator('[data-testid="product-description"]')
    .textContent();
  const price = await page.locator('[itemprop="price"]').textContent();
  const reviews = await page.locator('[itemprop="ratingCount"]').textContent();

  const ratingText =
    (await page
      .locator('[data-testid="reviews-and-ratings"] span')
      .first()
      .textContent()) ?? "";

  const ratingMatch = ratingText.match(/[\d.]+/);
  const rating = ratingMatch ? ratingMatch[0] : "N/A";

  return {
    sku,
    source: "Walmart",
    title: title?.trim() || "",
    description: description?.trim() || "",
    price: price || "",
    reviews: `${reviews || ""} | ${rating || ""}`
  };
}