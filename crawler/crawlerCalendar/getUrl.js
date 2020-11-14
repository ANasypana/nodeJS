const puppeteer = require('puppeteer');

const getUrl = async (url, browser) => {

  const page = await browser.newPage();

  try {
    await page.goto(url);
    const newUrl = await page.url();
    await page.close();

    return newUrl

  }catch (err){
    console.log(err.message)
  }
}

module.exports = getUrl;
