const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function splitPdf(pdfPath) {
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newPdfDoc = await PDFDocument.create();
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
    newPdfDoc.addPage(copiedPage);

    const pdfBytes = await newPdfDoc.save();
    fs.writeFileSync(`page_${i + 1}.pdf`, pdfBytes);
  }

  console.log("PDF split into individual pages.");
}
// your files here!
splitPdf("./files/eskem.pdf"); // your files here!
