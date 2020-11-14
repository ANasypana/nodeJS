const fs = require('fs/promises');

const crawlerCompanies = require('./crawlerCompanies');
const addInfoCompanies = require('./addInfoCompanies');
const amountReviews = require('./amountReviews');

const buildArrOfCompanies = async () => {
  try {
    await crawlerCompanies(200);
    const dataJson = await fs.readFile('./data.json');
    const data = JSON.parse(dataJson);
    const length = data.length;
    const marge = Math.ceil(length/50);
    let result = [];
    let step = 0;
    while (step < marge){
      const arrMarge = Math.min(length, (step + 1) * 50)
      const temArr = await addInfoCompanies(data.slice(step * 50, arrMarge));
      result = [...result, ...temArr];
      step++
    }

    const companiesDate = amountReviews(result);

    await fs.writeFile('./companies.json', JSON.stringify(companiesDate));

  }catch (err){
    console.log(err.message)
  }
}

module.exports = buildArrOfCompanies;
