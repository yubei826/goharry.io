const server = require("./serve");
const puppeteer = require("puppeteer");

server.listen(3000);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await page.pdf({ path: "static/resume.pdf", format: "A4" });

  await browser.close();
  console.log("generate PDF success!");
  process.exit(0);
})();
