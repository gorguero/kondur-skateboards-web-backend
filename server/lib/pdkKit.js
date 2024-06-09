import PDFDocument from 'pdfkit-table';
import { createWriteStream } from 'fs';
export function buildPDF(dataCallback, endCallback){
   const doc = new PDFDocument()

   doc.on('data',dataCallback);
   doc.on('end',endCallback);

   doc.text('Hello World');

   doc.end();
}