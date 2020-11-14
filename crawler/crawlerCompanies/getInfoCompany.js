const puppeteer = require('puppeteer');

const getInfoCompany = async (url, obj, browser) => {

  try {
    const page = await browser.newPage();
    await page.goto(url);
    //Site
    const site = await page.evaluate(() => {
      const dataSite = Array.from(document.querySelectorAll('div.company-info > div.site > a'));
      return dataSite.map(elem => elem.href)
    });

    //Events
    const events = await page.evaluate(() => {
      const dataEvents = Array.from(document.querySelectorAll('a.link[href$=_events]'));
      return dataEvents.map(elem => elem.href)
    });

    await page.close();

    return {...obj, site: site[0], events: events}

  }catch (err){
    console.log(err.message)
  }
}

module.exports = getInfoCompany;

