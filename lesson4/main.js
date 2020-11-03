const http = require('http');

const PORT = 3000;

const makeTable = require('./tableFromArr');
const makeSvg = require('./makeSvg');
const parser = require('./parser');

const url = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=2233&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10&scrollToAuto=28203699';
const url1 = 'https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&categories.main.id=1&brand.id[0]=79&price.currency=1&abroad.not=0&custom.not=1&page=0&size=10';


http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8;');
  await parser(url, 'tesla');
  await parser(url1, 'toyota');
  if (req.url === '/'){
    res.write('<div><a href="/tesla">Обновить данные по Tesla</a></div>');
    res.write('<div><a href="/toyota">Обновить данные по Toyota</a></div>');
  }else if (req.url === '/tesla') {
    res.write('<h2>Актуальные данные Tesla</h2>');
    const nameFile = await makeSvg('tesla', require('./tesla.json'));
    res.write(makeTable(require('./tesla.json')));
    if (!!nameFile) {
      res.write(`<div><a href=${nameFile}>Скачать данные: ${nameFile}</a></div>`);
    }
  }else if (req.url === '/toyota') {
    res.write('<h2>Актуальные данные Toyota</h2>');
    const nameFile = await makeSvg('toyota', require('./toyota.json'));
    res.write(makeTable(require('./toyota.json')));
    if (!!nameFile) {
      res.write(`<div><a href=${nameFile}>Скачать данные: ${nameFile}</a></div>`);
    }
  }else {
    res.write('<div>Not Found</div>');
  };

  res.end();
}).listen(PORT, () => {
  console.log(`Server runs on PORT ${PORT}`);
});
