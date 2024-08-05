import puppeteer from "puppeteer";

const scrapeAmazon = async (productUrl: string): Promise<string | null> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set a User-Agent to mimic a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
  );

  try {
    await page.goto(productUrl, { waitUntil: "networkidle2" });

    // Wait for the price element to load
    await page.waitForSelector(".a-price .a-offscreen", { timeout: 5000 });

    // Extract the price
    const price = await page.evaluate(() => {
      const priceElement = document.querySelector(".a-price .a-offscreen");
      return priceElement ? priceElement.textContent?.trim() || null : null;
    });

    await browser.close();
    return price;
  } catch (error) {
    console.error(`Error scraping Amazon: ${error}`);
    await browser.close();
    return null;
  }
};

(async () => {
  const productUrl =
    "https://www.amazon.com/Lenovo-Touchscreen-i3-1215U-Bluetooth-Accessories/dp/B0D5H83FMV/ref=sr_1_1_sspa?crid=3H8Z264A32KSR&dib=eyJ2IjoiMSJ9.igy5tfoSfv_wAqv2wPD2QHyU2wRyxrl3XE1pYd2VUSP3i300Np9XIu6ZC_giKe14X_7Dw88pvsQnV6saHnmBulIU8fibRs8nHkG_OGyxGaFVyQ4_cJIkV9hHUrIdfVqOmalN3SEJqlKaripSJTHjgSrZvf7m4h2Cw9U0emKVc1UMrRLLsImoPG8N8ibWxX2oSKmdTQv4C36Ek-4hgq_uaCeHyXJk_4SvQ88ir7wvVG8.ZNoSWcTn7IemZD1Y0eiubmE_MpWpLvvrtA85851NAo8&dib_tag=se&keywords=gaming%2Blaptop&qid=1722642977&sprefix=gaming%2Caps%2C184&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1";
  const price = await scrapeAmazon(productUrl);
  if (price) {
    console.log(`The current price is ${price}`);
  } else {
    console.log("Failed to retrieve the price");
  }
})();
