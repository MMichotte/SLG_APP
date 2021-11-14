import * as PDFMakePrinter from 'pdfmake/src/printer';
import * as fs from 'fs';

export class PDFMakeFileHelper {
  static generatePDF(docDefinition: any, docPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const printer = new PDFMakePrinter({
          Roboto: {
            normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
            bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
            bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
          },
        });
        const doc = printer.createPdfKitDocument(docDefinition);
        doc.pipe(fs.createWriteStream(docPath));
        doc.on('end', () => {
          resolve(true);
        });
        doc.end();

      } catch (err) {
        console.log(err);
        reject(false);
      }
    });
  }
}
