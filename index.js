const request = require('request');

const reg = /<a\sclass="item"\shref="(.|\n)*?"/g;

request('https://dou.ua/', function (error, response, body) {

  const tempArr = body.toString().match(reg);
  const index = tempArr[1].search(/https/);

  const arr = tempArr.map(temp => temp.slice(index, temp.length - 1));
  console.log("List of links:\n", arr)
});
