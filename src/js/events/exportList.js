import ExportHandler from '../classes/exportHandler';

const exportList = document.getElementById('export');

exportList.addEventListener('click', () => {
  ExportHandler.generateCSV();
  ExportHandler.generatePDF();
});

export default exportList;
