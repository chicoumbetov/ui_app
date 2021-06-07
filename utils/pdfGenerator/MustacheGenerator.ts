/**
 * Renvoie un code html à partir d'un template avec les valeur rentré dans l'object
 */

import Mustache from 'mustache';

export const output = (pdfTemplate: any, props: any) => Mustache.render(pdfTemplate, props);
