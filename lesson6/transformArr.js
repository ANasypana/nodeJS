import fs from 'fs';

const matchStr = (str, edgeStart, edgeEnd) => {
  const regExp = new RegExp(`${edgeStart}(.|\n)*?${edgeEnd}`, 'g');
  const result = str.match(regExp)[0].slice(edgeStart.length, str.match(regExp)[0].length - edgeEnd.length);

  return result.trim()
};

const transformArr = () => {
  try {
    fs.readFile('./data/images.json', 'utf8', (err, data) => {
      const temArr= data.split(";").slice(0, 30);
      const arr = temArr.map(item => ({url: JSON.parse(item).message,
        downloaded: JSON.parse(item).downloaded,
        breed:  matchStr(JSON.parse(item).message, 'breeds/', '/')
      }));
      console.log(arr);
    });

  }catch (err) {
    console.log(err.message)
  }

};

transformArr();