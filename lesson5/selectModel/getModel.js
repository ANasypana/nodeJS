import request from 'request';
import fs from 'fs';
import { matchStr } from '../utils/matchStr.js';

export const getModel = (url, name) => {
  try {
    const arr = [];
    request(url, (error, response, body) => {
      const strModel = matchStr(body.toString(), '<span class="blue bold">', '</a');
      const strUsd = matchStr(body.toString(), 'data-currency="USD">', '</');
      const strUan = matchStr(body.toString(), 'data-currency="UAH">', '</');

      for (let i = 0; i < 10; i++) {
        const temp = strModel[i].split('</span> ').map(elm => elm.trim());
        temp.push(+strUsd[i].split(" ").join(''));
        temp.push(+strUan[i].split(" ").join(''));
        arr.push(temp);
      }

      fs.writeFile(`./data/models/${name}.json`, JSON.stringify(arr), err => {
      });
    });
  } catch (err){
    console.log(err.message);
  }
};
