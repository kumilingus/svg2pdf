const puppeteer = require('puppeteer');

const IMAGE_ID = 'svg-image';
const PADDING = 20;

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle2' });

  const dimensions = await page.evaluate(id => {
    const element = document.getElementById(id);
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
  }, IMAGE_ID);

  console.log('Dimensions:', dimensions);

  await page.pdf({
    path: 'diagram.pdf',
    width: dimensions.width + PADDING,
    height: dimensions.height + PADDING
  });

  await browser.close();

})();
