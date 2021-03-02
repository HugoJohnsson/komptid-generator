const readlineSync = require('readline-sync');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateFile = (dataObj, filename) => {
    console.log('Genererar din komptidsrapport...');

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filename));

    doc.text('Page Title')

    doc.end();
}

module.exports = generateFile;