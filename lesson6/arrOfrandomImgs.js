import https from "https";
import fs from 'fs';


const getImage = (index) => {

  https.get('https://dog.ceo/api/breeds/image/random', res => {
    try {
      const start = new Date().getTime();
      res.on('data', (d) => {
        const tem = JSON.parse(d.toString());
        const end = new Date().getTime();
        const res = JSON.stringify({...tem, index, downloaded: end - start }).toString() + ';';
        fs.appendFile('./data/images.json', res, 'utf8', err => {
          fs.readFile('./data/images.json', 'utf8', (err, data) => {
            const tem = data.toString().split(";")
            if (tem.length > 30){
              console.log(tem.slice(0, 30));
            }
          } )
        } );
      });
    }catch (err){
      console.log(err.message)
    }
  })

}

export const buildArr = () => {
  try {
    for (let i = 0; i < 30; i++){
      getImage(i);
    };

  }catch (err){
    console.log(err.message)
  }
}

buildArr()