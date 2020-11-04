import http from 'http';
import { dateToStr } from './utils/dateToStr.js';
import { makeSvg } from  './utils/makeSvg.js';
import { makeTable } from './utils/tableFromArr.js';
import { transformName } from './utils/transformName.js';
import data from './selectModel/data/data.json';

const PORT = 3000;

http.createServer(async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    let list = '';
    const urls = [];
    const cvgUrls = [];

    for (const obj of data){
      const name = transformName(obj.name);
      const model = await import(`./selectModel/data/models/${name}.json`);
      urls.push(`/${name}`);
      list += `<li><a href="/${name}">${obj.name}</a></li>`;
      if(req.url === `/${name}`){
        res.write(`<h2>Актуальные данные ${obj.name}</h2>`);
        res.write(makeTable(model.default));
        const nameFile = await makeSvg(name, model.default);
        if(nameFile){
          cvgUrls.push(`/${nameFile}`);
          res.write(`<div><a href="/${nameFile}">Скачать данные: ${nameFile}</a></div>`);
        }
      }
    };

    if(req.url === '/'){
      res.write('<h2>TOP-10 brands</h2>');
      res.write(`<ul>${list}</ul>`);
    }

    if(/^\/[\w\-]+\.svg$/.test(req.url)){
      res.write('<button>Load...</button>');
    }

    if(!urls.includes(req.url) && req.url !== '/' && !/^\/[\w\-]+\.svg$/.test(req.url)){
      res.write('<h3>Sorry, this page does not exist</h3>');
    }

    res.end();

  }catch (err){
    res.write(err.message);
    res.end()
  }

}).listen(PORT, () => {
  console.log(`Server runs on PORT ${PORT}`);
});
