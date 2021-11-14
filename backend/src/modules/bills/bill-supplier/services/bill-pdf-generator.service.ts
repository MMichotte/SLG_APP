import { rootPath } from '@core/constants/root.path';
import { PDFMakeFileHelper } from '@core/helpers/pdf-make-file.helper';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { billedProduct, BillSupplierPdfDTO } from '../dto/bill-supplier-pdf.dto';

@Injectable()
export class BillPdfGeneratorService {

  async generatePDF(data: BillSupplierPdfDTO): Promise<boolean> {

    //TODO - format real PDF !! 

    const todayDate: string = (new Date()).toISOString().split('T')[0];
    
    const docDefinition = {
      pageMargins: [40, 150, 40, 40],
      header: {
        image: join(__dirname,'../../../../shared/img/entete_Factures_INTL.jpg'),
        width: '595.28'
      },
      footer: function (currentPage, pageCount) {
        return [{
          width: '100%',
          alignment: 'right',
          margin: [40, 0],
          text: `${currentPage}/${pageCount}`
        }];
      },
      content: [
        {
          columns: [
            {
              width: '33%',
              alignment: 'left',
              text: `${data.supplierName}`
            },
            {
              width: '33%',
              alignment: 'center',
              text: `BILL - ${data.billId}`
            },
            {
              width: '33%',
              alignment: 'right',
              text: todayDate
            }
          ],
          columnGap: 10,
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 100, 100],

            body: [
              [{ text: 'Reference', bold: true, fillColor: '#eeeeee' }, { text: 'Designation', bold: true, fillColor: '#eeeeee' }, { text: 'Quantity', bold: true, fillColor: '#eeeeee' }, { text: 'Price', bold: true, fillColor: '#eeeeee' }]
            ]
          }
        }
      ]
    };

    
    data.products.forEach((prod: billedProduct) => {
      docDefinition.content[1].table.body.push([
        { text: prod.reference, bold: false, fillColor: null },
        { text: prod.label, bold: false, fillColor: null },
        { text: prod.quantity.toString(), bold: false, fillColor: null },
        { text: prod.price.toString(), bold: false, fillColor: null }
      ]);
    });

  
    //TODO better path
    const path = `${rootPath}/bills/suppliers/${data.billId}_${data.supplierName}_${todayDate}.pdf`;
    return PDFMakeFileHelper.generatePDF(docDefinition, path);

    
  }

}
