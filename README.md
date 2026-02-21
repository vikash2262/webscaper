# Web Scraper Assessment

This project is a web scraper built using Playwright and TypeScript.  
It extracts product details from Amazon and Walmart product pages and saves the data into a CSV file.

---

## Tech Stack

- Node.js
- TypeScript
- Playwright
- PapaParse (for CSV generation)

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd web-scraper-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## Running the Scraper

### Build the project

```bash
npm run build
```

### Run the scraper

```bash
npm start
```

After execution, a `product_data.csv` file will be generated in the root directory.

---

## Output

The generated CSV contains the following columns:

- sku
- source (Amazon or Walmart)
- title
- description
- price
- rating
- reviewCount

Example:

```
sku,source,title,description,price,rating,reviewCount
B01XYZ,Amazon,Product Name,Product description,$29.99,4.5,1234
12345678,Walmart,Product Name,Product description,$19.99,4.7,119
```

---

## Assumptions Made

2. SKU is known beforehand and provided directly in the scraper logic.
1. Product pages are publicly accessible without login.
4. Only single product pages are scraped (no pagination).
5. Website structure does not change significantly.

---

## Limitations

1. The scraper relies on current DOM structure and selectors.
   If Amazon or Walmart update their UI, selectors may break.

2. No CAPTCHA solving is implemented.
   If the website blocks automation traffic, scraping may fail.

3. No proxy rotation or IP management is implemented.

4. The scraper runs sequentially (not parallelized).

5. Error handling logs failures but does not retry multiple times.

---

## Possible Improvements

- Add retry logic for failed requests
- Add proxy rotation support
- Add CLI arguments for dynamic SKU input
- Add parallel scraping
- Implement structured logging
- Add unit tests

---

## Notes

- The project uses ES Modules (`"type": "module"`).
- Type-only imports are used where required (`import type`).
- CSV generation is handled using PapaParse.

---

## Author

Vikash Gupta