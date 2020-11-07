import https from "https";
import fs from 'fs';

export const getImage = () => {
    https.get('https://dog.ceo/api/breeds/image/random', res => {
        try {
            res.on('data', (d) => {
                fs.writeFile('./data/data.json', d.toString(), err => {

                })
            });
        }catch (err){
            console.log(err.message)
        }
    })
}
