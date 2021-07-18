import 'intl';
import 'intl/locale-data/jsonp/fr';

const currencyFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const numberFormatter = new Intl.NumberFormat('fr-FR', { style: 'decimal' });
const baseNumberFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false,
});
export default {
  currencyFormatter,
  numberFormatter,
  baseNumberFormatter,
};
