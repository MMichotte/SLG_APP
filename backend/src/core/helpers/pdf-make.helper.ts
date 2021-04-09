import * as PDFMakePrinter from 'pdfmake/src/printer';

export class PDFMakeHelper {
  static generatePDF(docDefinition: any): Promise<Buffer> {
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

        const chunks = [];

        doc.on('data', (chunk: any) => {
          chunks.push(chunk);
        });

        doc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        doc.end();

      } catch (err) {
        reject(err);
      }
    });
  }
}
