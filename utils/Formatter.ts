const currencyFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const numberFormatter = new Intl.NumberFormat('fr-FR', { style: 'decimal' });
export default {
  currencyFormatter,
  numberFormatter,
};
