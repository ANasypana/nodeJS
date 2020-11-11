const checkDate = (str, date="2020-01-01") => {
  const controlDate = new Date(date);
  const currentDate = new Date(str.slice(str.length - 11, str.length - 1));

  return currentDate > controlDate
}

module.exports = checkDate;
