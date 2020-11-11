const getMonth = (str) => {
  const date = new Date(str.slice(str.length - 11, str.length - 1));
  return date.getMonth() + 1
}

module.exports = getMonth;
