import html2pdf from 'html2pdf.js';
import { output } from './MustacheGenerator';

const pdfGenerator = async (pdfTemplate: string, props: Object) => {
  const html = output(pdfTemplate, props);
  const pdfFile = await html2pdf().from(html, 'string').outputPdf('bloburi');
  // console.log('pdf generator : ', pdfFile);
  return { uri: pdfFile };
};

export default pdfGenerator;
