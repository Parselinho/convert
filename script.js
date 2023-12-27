const fs = require("fs");
const CloudmersiveConvertApiClient = require("cloudmersive-convert-api-client");
require("dotenv").config();

let defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
let Apikey = defaultClient.authentications["Apikey"];
Apikey.apiKey = process.env.APIKEY;

let apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

function convertPdfToWord(pdfFilePath, outputFilePath) {
  let inputFile = Buffer.from(fs.readFileSync(pdfFilePath).buffer); // File | Input file to perform the operation on.
  apiInstance.convertDocumentPdfToDocx(inputFile, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      fs.writeFileSync(outputFilePath, data);
      console.log("PDF successfully converted to Word:", outputFilePath);
    }
  });
}

convertPdfToWord("./files/eskem.pdf", "./files/page.docx");
