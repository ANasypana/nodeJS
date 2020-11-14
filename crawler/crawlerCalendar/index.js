const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const addInfo = require('./addInfo');
const crawlerCalendar = require('./crawlerCalendar');

const buildArrOfEvents = async () => {
  try {
    /*await crawlerCalendar(1, [],'2020-04-30');*/
    const dataJson = await fs.readFile('./data.json');
    const data = JSON.parse(dataJson);
    const length = data.length;
    const marge = Math.ceil(length/20);
    let result = [];
    let step = 0;
    while (step < marge){
      const arrMarge = Math.min(length, (step + 1) * 20)
      const temArr = await addInfo(data.slice(step * 20, arrMarge));
      result = [...result, ...temArr];
      const name = `./events${step}.json`
      await fs.writeFile(name, JSON.stringify(result));
      step++
    }

    /*await fs.writeFile('./events.json', JSON.stringify(result));*/

  }catch (err){
    console.log(err.message)
  }
}

buildArrOfEvents()

