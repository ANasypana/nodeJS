const request = require('request');

const regLinks = /<a\sclass="item"\shref="(.|\n)*?<\/a>/g;
const regImgs = /loading="lazy"\ssrc="(.|\n)*?"/g;

request('https://dou.ua/', (error, response, body) => {
  const tempArrLink = body.toString().match(regLinks);
  const tempArrImg = tempArrLink.join(' ').match(regImgs);

  const index = tempArrImg[0].search(/src="/);
  const arrImg = tempArrImg.map(link => link.slice(index + 5, link.length - 1));

  console.log('List of img`s links:\n', arrImg);
});
