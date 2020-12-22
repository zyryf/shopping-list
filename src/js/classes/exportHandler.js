import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExportToCsv } from 'export-to-csv';
import Storage from './Storage';

class ExportHandler {
  static generateCSV() {
    const products = Storage.getProducts();
    const options = {
      filename: 'product-list',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Product List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(products);
  }

  static generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const products = Storage.getProducts();
    let content = '';

    products.forEach((product) => {
      content += '\n';
      Object.keys(product).forEach((key) => {
        content += `${product[key]} `;
      });
    });

    const docDefinition = {
      content,
    };

    pdfMake.createPdf(docDefinition).download();
  }
}

export default ExportHandler;
