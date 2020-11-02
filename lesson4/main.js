const http = require('http');

const PORT = 3000;
const table = require('./tableFromArr');
const makeSvg = require('./makeSvg');
const data = require('./table.json');

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8;');
  if (req.url === '/') res.write('<a href="/tesla">Обновить данные по Тесле</a>');
  if (req.url === '/tesla') {
    res.write('<h2>Актуальные данные</h2>');
    const nameFile = makeSvg('tesla', data);
    res.write(table);
    if (!!nameFile) {
      res.write(`<div><a href=${nameFile}>Скачать данные: ${nameFile}</a></div>`);
    }
  };
  res.end();
}).listen(PORT, () => {
  console.log(`Server runs on PORT ${PORT}`);
});
