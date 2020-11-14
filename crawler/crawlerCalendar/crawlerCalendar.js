const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const getDate = require('../utils/getDate');
const checkDate = require('../utils/checkDate');

const crawlerCalendar = async (n=1, data= [], date="2020-01-01") => {
  const url = "https://dou.ua/calendar/archive/";
  let isLast = true;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${url}${n}/`);

    //Information about date
    const dateLinks = await page.evaluate(() => {
      const dateHrefs = Array.from(document.querySelectorAll('div.info > a'));
      const dateNumbers = Array.from(document.querySelectorAll('div.info'));
      const numbers = dateNumbers.map(elm => {
        const arr = elm.textContent.trim().split('\n\t');
        const number = arr.length === 3 ? arr[2].split(' ')[0].trim() : 1
        return number
      });

      return dateHrefs.map((href, index) => ({url: href.href, number: numbers[index]}))
    });

    //Extract information about events without date from the pag
    const events = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('article.b-postcard > .title > a'));
      const whenAndWhere = Array.from(document.querySelectorAll('article.b-postcard > div.when-and-where'));
      const price = Array.from(document.querySelectorAll('article.b-postcard > .when-and-where > span[style]'));
      const where = whenAndWhere.map(elem => {
        let str = elem.textContent.split("\n\n")[1].trim();
        if(str.includes('\n\t')){
          const tempArr = str.split('\n\t');
          str = tempArr[0];
        }
        return str

      });

      const events = titles.map((elm, index) => ({
        url: elm.href,
        title: elm.textContent.trim(),
        place: where[index].trim(),
        price: price[index] === undefined ? 'NaN' : price[index].textContent.trim()}));

      return events
    });

    //Check date and add info about date to events
    let start = 0;
    const length = events.length;
    dateLinks.forEach((info, index) => {
      isLast = checkDate(info.url, date);
      if(isLast){
        const currentDate = getDate(info.url);
        let amount = Number(info.number);
        if(index === 0){
          const checkArr = data.filter(elm => elm.date === currentDate);
          amount -= checkArr.length
        };
        amount = amount < length - start ? amount : length - start;
        const temArr = events.slice(start, start + amount)
          .map(elm => ({...elm, date: currentDate}));
        data = [...data, ...temArr];
        start += amount
      }
    });

    await browser.close();
    if(!isLast){
      await fs.writeFile('./data.json', JSON.stringify(data));
      return
    }
    await crawlerCalendar(n+1, data, date)

  }catch (err){
    console.log(err.message)
  }
}

module.exports = crawlerCalendar;
