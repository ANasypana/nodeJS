const getHostFromUrl = str => {
  const myURL = new URL(str);

  return myURL.host
}

module.exports = getHostFromUrl;
