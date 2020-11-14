const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const crawlerEvent = require('./crawlerEvent');

const addInfo = async arr => {
  try {
    const browser = await puppeteer.launch({ headless: true });

    //Add info from event`s page
    const updateEvents = await Promise.all(arr.map(async event => {
      const newEvent = await crawlerEvent(event.url, event, browser);
      return newEvent
    }));

    await browser.close();
    return updateEvents

  }catch (err){
    console.log(err.message)
  }
};

module.exports = addInfo;
