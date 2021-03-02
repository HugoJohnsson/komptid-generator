const fs = require('fs');
const PDF = require('./PDF');
const { monthName } = require('./helpers/months');
const { exit } = require('process');

const generateFile = (dataObj, path) => {
  let doc = new PDF({ size: 'A4', margin: 50 });

  generateHeader(doc, dataObj);
  generateDaysTable(doc, dataObj);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

const generateHeader = (doc, dataObj) => {
    generateHr(doc, 155);

    doc
    .fillColor('#444444')
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Komptidsrapport', 50, 160);

    doc
    .fillColor('#444444')
    .font('Helvetica')
    .fontSize(10)
    .text('Företag: PRNT Printing Solutons AB/Stickerapp', 50, 180);

    doc
    .fillColor('#444444')
    .font('Helvetica')
    .fontSize(10)
    .text(`Namn: ${dataObj.name}`, 50, 200);

    doc
    .fillColor('#444444')
    .font('Helvetica')
    .fontSize(10)
    .text(`År: ${dataObj.year}`, 50, 220);

    doc
    .fillColor('#444444')
    .font('Helvetica')
    .fontSize(10)
    .text(`Månad: ${monthName(dataObj.month)}`, 50, 240);

    doc
    .fillColor('#444444')
    .font('Helvetica')
    .fontSize(10)
    .text(`Totalt: ${dataObj.totalHours}`, 50, 260);

    generateHr(doc, 275);
}

const generateDaysTable = (doc, dataObj) => {
    let rows = [];

    for (const key in dataObj.days) {
        rows.push([`${key}/${dataObj.month}/${dataObj.year}`, dataObj.days[key].hours, dataObj.days[key].description]);
    }

    const table0 = {
        headers: ['Datum', 'Timmar', 'Beskrivning'],
        rows: rows
    };
    
    doc.table(table0, {
        prepareHeader: () => doc.font('Helvetica').fontSize(9),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(9)
    });
}

const generateHr = (doc, y) => {
    doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

module.exports = generateFile;