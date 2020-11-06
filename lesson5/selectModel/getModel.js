import request from 'request';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url'
import { matchStr } from '../utils/matchStr.js';

export const getModel = async (url, name) => {
  try {
    const arr = [];
    await request(url, async (error, response, body) => {
      const strModel = matchStr(body.toString(), '<span class="blue bold">', '</a');
      const strUsd = matchStr(body.toString(), 'data-currency="USD">', '</');
      const strUan = matchStr(body.toString(), 'data-currency="UAH">', '</');

      for (let i = 0; i < 10; i++) {
        const temp = strModel[i].split('</span> ').map(elm => elm.trim());
        temp.push(+strUsd[i].split(" ").join(''));
        temp.push(+strUan[i].split(" ").join(''));
        arr.push(temp);
      }
      const dirName = path.dirname(fileURLToPath(import.meta.url));
      await fs.writeFile(path.join(dirName, `./data/models/${name}.json`), JSON.stringify(arr));
    });
  } catch (err){
    console.log(err.message);
  }
};
