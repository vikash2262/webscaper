export class ScraperError extends Error {
  constructor(
    message: string,
    public sku: string,
    public source: string
  ) {
    super(message);
    this.name = "ScraperError";
  }
}