const puppeteer = require('puppeteer');
const getUrl = require('./getUrl');

const crawlerEvent = async (url, obj, browser) => {
  const page = await browser.newPage();
  try {
    await page.goto(url);
    //Information about amount of views
    const views = await page.evaluate(() => {
      const dataviews = Array.from(document.querySelectorAll('div.b-post-tags > span.pageviews'));
      return dataviews.map(elem => elem.textContent.trim())
    });

    //Information about amount of themes
    const themes = await page.evaluate(() => {
      const datathemes = Array.from(document.querySelectorAll('div.b-post-tags > a'));
      return datathemes.map(elem => elem.textContent.trim())
    });

    //Links
    const tempLinks = await page.evaluate(() => {
      const datalinks = Array.from(document.querySelectorAll('article.b-typo  a'));
      return datalinks.map(elem => elem.href)
    });

    const mailArr = tempLinks.filter(elm => /^mailto:*/.test(elm));
    if(mailArr.length > 0) obj.mail = mailArr.map(elm => elm.slice(7));
    const firstArr = tempLinks.filter(elm => !/^mailto:*/.test(elm));

    const links = await Promise.all(firstArr.map(async elm => {
      const newUrl = await getUrl(elm, browser);
      return newUrl
    }));

    await page.close();

    return {...obj, views: views[0], themes, links}

  }catch (err){
    console.log(err.message)
  }
}

module.exports = crawlerEvent;

