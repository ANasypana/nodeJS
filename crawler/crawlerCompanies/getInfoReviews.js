const puppeteer = require('puppeteer');

const getInfoReviews = async (url, obj, browser) => {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    //Reviews
    const reviews = await page.evaluate(() => {
      const dataAuthor = Array.from(document.querySelectorAll('div.l-avatar > a.avatar'));
      const dateData = Array.from(document.querySelectorAll('div.b-post-author.g-approved-user > a.comment-link'));
      return dataAuthor.map((elem, index) => ({authorLink: elem.href,
        author: elem.textContent.trim(),
        date: dateData[index] === undefined ? 'NaN' : dateData[index].textContent.trim()
      }))
    });

    await page.close();

    return {...obj, reviews: reviews}

  }catch (err){
    console.log(err.message)
  }
}

module.exports = getInfoReviews;
