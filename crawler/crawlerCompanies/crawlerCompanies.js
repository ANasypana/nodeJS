const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const isElementVisible = require('./isElementVisible');

const crawlerCompanies = async (amount) => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'https://jobs.dou.ua/companies/';
  try {
    await page.goto(url);
    const btnSelector = 'div.b-companies-list > div.more-btn >a';

    let btnMoreVisible = await isElementVisible(page, btnSelector);
    let count = amount;
    while (btnMoreVisible && count> 1){
      await page.click(btnSelector, {delay: 2000});
      btnMoreVisible = await isElementVisible(page, btnSelector);
      count--;
    }

    //Information about companies
    const dateCompanies = await page.evaluate(() => {
      const dateNames = Array.from(document.querySelectorAll('div.company > div.ovh> div.h2 > a'));

      return dateNames.map(elem => ({urlDou: elem.href, name: elem.textContent}))
    });

    await fs.writeFile('./data.json', JSON.stringify(dateCompanies));
    await browser.close();

  }catch (err){
    console.log(err.message)
  }
}

module.exports = crawlerCompanies;
