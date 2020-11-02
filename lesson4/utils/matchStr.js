const matchStr = (str, edgeStart, edgeEnd) => {
  const regExp = new RegExp(`${edgeStart}(.|\n)*?${edgeEnd}`, 'g');

  const result = str.match(regExp).map(temp => temp.slice(edgeStart.length, temp.length - edgeEnd.length));

  return result
};

module.exports = matchStr;
