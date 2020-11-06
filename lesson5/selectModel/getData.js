import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url'
import { getModel } from './getModel.js';
import { transformName } from '../utils/transformName.js';


export const getData = async () => {
  try {
    const dirName = path.dirname(fileURLToPath(import.meta.url));

    const files = await fs.readdir(path.join(dirName, './data/models/'));
    if( files.length ) {
      await Promise.all(files.map(async filename =>
        await fs.unlink(path.join(dirName, './data/models/', filename))));
    };

    const data = await fs.readFile('./data/data/data.json');
    const arr = JSON.parse(data.toString());

    await Promise.all(arr.map(async obj =>
      await getModel(
        `https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=${obj.value}&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10`,
      transformName(obj.name))));

  }catch (err){
    console.log(err.message)
  }
};

getData();
