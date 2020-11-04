import request from 'request';
import fs from 'fs';
import { matchStr } from '../utils/matchStr.js';

const url = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=2233&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10&scrollToAuto=28203699';

export const getAllModels = async (url, top=10) => {
  await request(url, (error, response, body) => {
    try {
      //We couldn't put too long regExp
      const data = [];
      const searchFirst = matchStr(body.toString(), 'Марка</label> <select class="selected grey hide"  data-category="1"', '</select>');
      const index = searchFirst[0].search(/<option\svalue="(?!0)/);
      const temArr = searchFirst[0].slice(index).split('</option>')
      const lengthArr = temArr.length;
      for (let i = 0; i < lengthArr - 1; i++) {
        const tempObj = {};
        const value = matchStr(temArr[i], 'value="', '"');
        tempObj.value = value[0];
        const number = matchStr(temArr[i], 'data-count="', '"');
        tempObj.number = number[0];
        const name = matchStr(temArr[i], '>', '&#');
        tempObj.name = name[0].trim();
        data.push(tempObj)
      }
      fs.writeFile('./data/data.json',
        JSON.stringify(data
          .sort((a,b) => b.number - a.number)
          .slice(0, top)),
          err => {});

    }catch (err){
      console.log(err.message)
    }
  })
}

getAllModels(url);
