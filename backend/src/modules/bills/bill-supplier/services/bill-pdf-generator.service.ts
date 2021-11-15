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

    data.invoicedAmount = 0;
    data.products.forEach(prod => {
      data.invoicedAmount += prod.quantity * prod.invoicedPrice;
    });

    const docDefinition = {
      pageMargins: [20, 125, 20, 40],
      header: [
        {
          //image: join(__dirname, '../../../../shared/img/entete_Factures_INTL.jpg'),
          //width: '595.28'
          margin: [40, 40],
          alignment: 'center',
          text: 'Supplier - Bill',
          fontSize: 30
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: -20,
              x2: 595.28, y2: -20,
              lineWidth: 2,
              lineColor: 'gray',
            }
          ]
        }
      ],
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
              width: '50%',
              alignment: 'left',
              lineHeight: 1.5,
              stack: [
                {
                  columns: [
                    {
                      width: '50%',
                      alignment: 'left',
                      text: [{ text: 'Bill n°:  ', bold: true }, `${data.billId}   `]
                    },
                    {
                      width: '50%',
                      alignment: 'left',
                      text: [{ text: 'Order n°:  ', bold: false }, `${data.orderId}`]
                    }
                  ]
                },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: -2,
                      y: -25,
                      w: 265,
                      h: 20,
                      lineWidth: 0.5,
                      lineColor: 'black',
                    }
                  ]
                },

                {
                  text: [
                    'Bill date:  ', { text: `${data.date}   `, bold: true },
                    'Order date:  ', { text: `${new Date(data.orderDate).toISOString().split('T')[0]}   `, bold: true }
                  ]
                },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: -2,
                      y: -25,
                      w: 265,
                      h: 20,
                      lineWidth: 0.5,
                      lineColor: 'black',
                    }
                  ]
                }
              ]
            },
            {
              width: '50%',
              alignment: 'left',
              lineHeight: 1.5,
              stack: [
                { text: `${data.supplierName}`, bold: true },
                { text: ['VAT n°:  ', { text: `${data.vat ? data.vat : '/'}`, bold: true }] },
                { text: [{ text: 'Invoice n°:  ', bold: false }, `${data.invoiceNumber ? data.invoiceNumber : '/'}`] },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: -2,
                      y: -72,
                      w: 272,
                      h: 70,
                      lineWidth: 0.5,
                      lineColor: 'black',
                    }
                  ]
                },
              ]
            }
          ],
          columnGap: 10,
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            lineHeight: 1.2,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Reference', bold: true, fillColor: null, border: [true, true, true, true] },
                { text: 'Designation', bold: true, fillColor: null, border: [true, true, true, true] },
                { text: 'Qty', bold: true, fillColor: null, border: [true, true, true, true], alignment: 'left' },
                { text: 'Inv. Price HT (nc)', bold: true, fillColor: null, border: [true, true, true, true], alignment: 'left' },
                { text: 'Price HT (€)', bold: true, fillColor: null, border: [true, true, true, true], alignment: 'left' },
                { text: 'Total HT (€)', bold: true, fillColor: null, border: [true, true, true, true], alignment: 'left' }]
            ]
          }
        },
        {
          margin: [0, 10],
          stack: [
            { text: 'Note:', bold: true },
            { text: `${data.note ? data.note : '/'}` }
          ]
        },
        {
          margin: [0, 10],
          columns: [
            {
              width: '50%',
              alignment: 'left',
              lineHeight: 1.5,
              stack: []
            },
            {
              width: '50%',
              alignment: 'right',
              lineHeight: 1.5,
              bold: false,
              fontSize: 13,
              stack: [
                {
                  columns: [
                    {
                      width: '50%',
                      alignment: 'left',
                      stack: [
                        { text: 'Shipping:  ' },
                        { text: 'Total Invoiced HT:  ' },
                        { text: 'Total Debited HT:  ', bold: true, fontSize: 15 },
                      ]
                    },
                    {
                      width: '45%',
                      alignment: 'right',
                      stack: [
                        { text: `${data.shippingFees} (nc)` },
                        { text: `${data.invoicedAmount} (nc)` },
                        { text: `${data.debitedAmount} €`, bold: true, fontSize: 15 },
                      ]
                    }
                  ]
                },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: -85,
                      w: 285,
                      h: 90,
                      lineWidth: 0.5,
                      lineColor: 'black',
                    }
                  ]
                }
              ]

            }
          ]
        }
      ]
    };


    data.products.forEach((prod: billedProduct) => {
      docDefinition.content[1].table.body.push([
        { text: prod.reference, bold: false, fillColor: null, border: [true, false, false, false] },
        { text: prod.label, bold: false, fillColor: null, border: [true, false, false, false] },
        { text: prod.quantity.toString(), bold: false, fillColor: null, border: [true, false, false, false], alignment: 'right' },
        { text: prod.invoicedPrice.toString(), bold: false, fillColor: null, border: [true, false, false, false], alignment: 'right' },
        { text: prod.price.toString(), bold: false, fillColor: null, border: [true, false, false, false], alignment: 'right' },
        { text: (prod.quantity * prod.price).toString(), bold: false, fillColor: null, border: [true, false, true, false], alignment: 'right' }
      ]);
    });

    docDefinition.content[1].table.body.push([
      { text: '', bold: false, fillColor: null, border: [true, false, false, true] },
      { text: '', bold: false, fillColor: null, border: [true, false, false, true] },
      { text: '', bold: false, fillColor: null, border: [true, false, false, true] },
      { text: '', bold: false, fillColor: null, border: [true, false, false, true] },
      { text: '', bold: false, fillColor: null, border: [true, false, false, true] },
      { text: '', bold: false, fillColor: null, border: [true, false, true, true] }
    ]);


    //TODO better path
    const path = `${rootPath}/bills/suppliers/${data.billId}_${data.supplierName}_${todayDate}.pdf`;
    return PDFMakeFileHelper.generatePDF(docDefinition, path);


  }

}
