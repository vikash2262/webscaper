import fs from "fs";
import Papa from "papaparse";

export interface ProductData {
  sku: string;
  source: "Amazon" | "Walmart";
  title: string;
  description: string;
  price: string;
  reviews: string; // number of reviews + rating combined
}

export function writeToCSV(data: ProductData[], filePath: string) {
  const csv = Papa.unparse(data);

  fs.writeFileSync(filePath, csv, "utf8");

  console.log(`CSV file created at ${filePath}`);
}

export function logError(error: unknown) {
  const message =
    error instanceof Error ? error.stack || error.message : String(error);

  fs.appendFileSync("error.log", message + "\n", "utf8");
}