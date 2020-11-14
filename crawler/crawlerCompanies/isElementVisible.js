
const isElementVisible = async (page, cssSelector) => {
  try {
    await page.waitForSelector(cssSelector, {visible: true});
    return true;
  } catch {
    return false;
  }
};

module.exports = isElementVisible;


