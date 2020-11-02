const fs = require('fs');
const dateToStr = require('./utils/dateToStr');

const makeSvg = (name, arr) => {
  try {
    let str = '';
    if (!Array.isArray(arr)) throw new Error('Wrong format of data');
    for (let i in arr) {
      if (!Array.isArray(arr[i])) throw new Error('Wrong format of data');
      if (arr[i].length !== arr[0].length) throw new Error('Wrong format of data');
      str += '\"' + arr[i].join('";"') + '"\r\n';
    };
    const date = dateToStr();
    const nameFile = `${name}_${date}.svg`;
    fs.writeFile(nameFile, str, err => {

    });
    return `${name}_${date}.svg`
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = makeSvg;
