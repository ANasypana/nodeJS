const fs = require('fs');
const path = require('path');
const request = require('request');

// Put files from one folder towards another

fs.readdir('./src/img/', (err, files) => {
  try {
    if (err) throw new Error('Could not check this dir');
    if (files.length > 0) {
      const dirName = path.join(__dirname, 'src', 'data');

      fs.mkdir(dirName, { recursive: true }, err => {
        if (err) throw new Error('Could not create folder data');

        files.forEach((file) => {
          fs.readFile(path.join(__dirname, 'src', 'img', file), (err, data) => {
            if (err) throw new Error(`Could not read fife ${file}`);

            fs.writeFile(path.join(dirName, file), data, (err) => {
              if (err) throw new Error(`Could not write ${file} to folder data`);
            });
          });
        });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

// Write list of img`s links in file

request('https://dou.ua/', (error, response, body) => {

  const regLinks = /<a\sclass="item"\shref="(.|\n)*?<\/a>/g;
  const regImgs = /loading="lazy"\ssrc="(.|\n)*?"/g;
  const dirName = path.join(__dirname, 'src', 'data');
  const fifeName = 'list.txt';
  try {
    if (error) throw new Error('Something went wrong, try again');
    const tempArrLink = body.toString().match(regLinks);
    const tempArrImg = tempArrLink.join(' ').match(regImgs);

    const index = tempArrImg[0].search(/src="/);
    const arrImg = tempArrImg.map(link => link.slice(index + 5, link.length - 1));

    if (arrImg.length > 0) {
      fs.mkdir(dirName, { recursive: true }, err => {
        if (err) throw new Error('Could not create folder data');
        arrImg.forEach(link => {
          fs.appendFile(path.join(dirName, fifeName), link + '\n', 'utf8', err => {
            if (err) throw new Error('Something wrong with writable');
          });
        });
      });
    }
  }catch (err){
    console.log(err.message);
  }
});
