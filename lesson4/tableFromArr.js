const data = require('./table.json');

const makeTable = data => {
  try {
    let str = '';
    if (!Array.isArray(data)) throw new Error('Wrong format of data');
    for (let i in data) {
      if (!Array.isArray(data[i])) throw new Error('Wrong format of data');
      if (data[i].length !== data[0].length) throw new Error('Wrong format of data');
      str += '<tr><td>' + data[i].join('</td><td>') + '</td></tr>';
    }
    return '<table>' + str + '</table>'

  }catch (err){
    console.log(err.message)
  }
}

const table = makeTable(data);

module.exports = makeTable;
