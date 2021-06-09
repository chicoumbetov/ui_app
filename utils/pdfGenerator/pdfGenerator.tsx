import * as Print from 'expo-print';
import { output } from './MustacheGenerator';

const pdfGenerator = async (pdfTemplate: string, props: Object) => {
  const html = output(pdfTemplate, props);
  const options = {
    html,
    base64: true,
  };
  try {
    console.log('aaa');
    const results = await Print.printToFileAsync(options);
    console.log(results.uri);
    return results;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default pdfGenerator;