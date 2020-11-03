const request = require('request');
const fs = require('fs');
const matchStr = require('./utils/matchStr');

const url = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=2233&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10&scrollToAuto=28203699';
const url1 = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=79&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10';

const parser = (url, name) => {
  try {
    const arr = [];
    request(url, (error, response, body) => {
      const strModel = matchStr(body.toString(), '<span class="blue bold">', '</a');
      const strUsd = matchStr(body.toString(), 'data-currency="USD">', '</');
      const strUan = matchStr(body.toString(), 'data-currency="UAH">', '</');
      const index = Math.min(strModel.length,  strUan.length, strUsd.length);

      for (let i = 0; i < index; i++) {
        const temp = strModel[i].split('</span> ').map(elm => elm.trim());
        temp.push(+strUsd[i].split(" ").join(''));
        temp.push(+strUan[i].split(" ").join(''));
        arr.push(temp);
      }

      fs.writeFile(`${name}.json`, JSON.stringify(arr), err => {

      });
      return true
    });
  } catch (err){
    console.log(err.message);
  }
};

parser(url1);

module.exports = parser;
