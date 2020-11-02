const transfortNumber = number => number > 9 ? number.toString() : ("0" +  number.toString());

const dateToStr = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = transfortNumber(date.getMonth() + 1);
  const day = transfortNumber(date.getDate());
  const hour = transfortNumber(date.getHours());
  const min = transfortNumber(date.getMinutes());
  const sec = transfortNumber(date.getSeconds());

  return year + month + day + '-' + hour + min + sec
}

module.exports = dateToStr;
