import ExportHandler from '../classes/exportHandler';

const exportPDF = document.getElementById('export-pdf');

exportPDF.addEventListener('click', () => {
  ExportHandler.generatePDF();
});

const exportCSV = document.getElementById('export-csv');

exportCSV.addEventListener('click', () => {
  ExportHandler.generateCSV();
});

export { exportPDF, exportCSV };
