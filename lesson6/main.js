import http from 'http';
import fs from 'fs';
import {getImage} from './getImage.js';
const PORT = 3000;


http.createServer((req, res) => {
        try{
                getImage();
                res.setHeader('Content-Type', 'text/html; charset=utf-8;');
                const result = fs.readFileSync('./data/data.json', 'utf8');
                if(result === null) throw new Error('Something went wrong, try update page!')
                const data = JSON.parse(result);
                if(data.status === 'success'){
                        res.write(`<div><img src=${data.message}></div>`);
                        res.write('<a href="/">Update Picture</a>')

                }else {
                        res.write('<a href="/">Update Picture</a>')
                }
                res.end();

        }catch (err){
                res.write(`<div>${err.message}</div>`);
                res.end();
        }
    }
).listen(PORT, () => {console.log(`Server runs on PORT ${PORT}`)})

