const puppeteer = require('puppeteer');

const getInfoCompany = require('./getInfoCompany');
const getInfoReviews = require('./getInfoReviews');


const addInfoCompanies = async arr => {
  try {
    const browser = await puppeteer.launch({ headless: true });

    //Add info from companies pages
    const firstIter = await Promise.all(arr.map(async elem => {
      if(!elem.urlDou){
        return elem
      }
      const newObj = await getInfoCompany(elem.urlDou, elem, browser);
      return newObj
    }));
    const withoutSite = firstIter.filter(elm => elm.site === undefined);
    const withSite = firstIter.filter(elm => elm.site !== undefined);
    let secondIter = [];

    if(withoutSite.length > 0){
      secondIter = await Promise.all(withoutSite.map(async elem => {
        if(!elem.urlDou){
          return elem
        }
        const newObj = await getInfoCompany(elem.urlDou, elem, browser);
        return newObj
      }));
    }

    const comInfo = secondIter.length > 0 ? [...withSite, ...secondIter] : [...withSite];

    const thirdIter = await Promise.all(comInfo.map( async elem => {
      if(!elem.urlDou){
        return elem
      }
      const revUrl = `${elem.urlDou}reviews/`
      const newObj = await getInfoReviews(revUrl, elem, browser);
      return newObj
    }));

    const withoutReviews = thirdIter.filter(elm => elm.reviews.length === 0);
    const withReviews = thirdIter.filter(elm => elm.reviews.length > 0);

    let fourthIter = [];
    if(withoutReviews.length > 0){
      fourthIter = await Promise.all(withoutReviews.map( async elem => {
        if(!elem.urlDou){
          return elem
        }
        const revUrl = `${elem.urlDou}reviews/`
        const newObj = await getInfoReviews(revUrl, elem, browser);
        return newObj
      }));
    }

    const result = fourthIter.length > 0 ? [...withReviews, ...fourthIter] : [...withReviews];

    await browser.close();

    return result

  }catch (err){
    console.log(err.message)
  }
}

module.exports = addInfoCompanies;
