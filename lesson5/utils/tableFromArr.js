export const makeTable = data => {
  try {
    let str = '';
    if (!Array.isArray(data)) throw new Error('Wrong format of data');
    for (let i in data) {
      if (!Array.isArray(data[i])) throw new Error('Wrong format of data');
      if (data[i].length !== data[0].length) throw new Error('Wrong format of data');
      str += '<tr><td>' + data[i].join('</td><td>') + '</td></tr>';
    };
    const header = '<tr><th>Madel</th><th></th><th>Year</th><th>USD</th><th>UAH</th></tr>';
    return '<table>' + header + str + '</table>'

  }catch (err){
    console.log(err.message)
  }
}
