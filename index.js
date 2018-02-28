const puppeteer = require('puppeteer');

const IMAGE_ID = 'svg-image';
const PADDING = 20;

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle2' });

  // Alternative, which requires no localhost
  // const MAX_SIZE_PX = 15000;
  // const FILE_NAME = 'diagram.svg';
  // const fs = require('fs');
  // const imageDataURI = 'data:image/svg+xml;base64,' + new Buffer(fs.readFileSync(FILE_NAME)).toString('base64');;
  // const html = `<img id="${IMAGE_ID}" src="${imageDataURI}" style="max-width: ${MAX_SIZE_PX}px; max-height: ${MAX_SIZE_PX}px"></img>`;
  // await page.setContent(html);

  const dimensions = await page.evaluate(id => {
    const element = document.getElementById(id);
    return { width: element.clientWidth, height: element.clientHeight };
  }, IMAGE_ID);

  console.log('Dimensions:', dimensions);

  await page.pdf({
    path: 'diagram.pdf',
    width: dimensions.width + PADDING,
    height: dimensions.height + PADDING
  });

  await browser.close();

})();
