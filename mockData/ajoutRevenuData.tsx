import { Frequency } from '../src/API';

export const typeRevenu = [
  {
    label: 'Loyer',
    key: 'rent',
  },
  {
    label: 'CAF',
    key: 'caf',
  },
  {
    label: 'Revenu Divers',
    key: 'variousRevenue',
  },
];

export const montant = [
  {
    label: 'Loyer',
    key: 'rent',
  },
  {
    label: 'Charges',
    key: 'rentalCharges',
  },
  {
    label: 'TauxFrais',
    key: 'managementFees',
  },
];

export const typeMontant = [
  {
    label: 'Résidence Principale',
    key: 'b1',
  },
  {
    label: 'Résidence Secondaire',
    key: 'b2',
  },
  {
    label: 'Investissement Locatif Professionnel ou Commercial',
    key: 'b3',
  },
  {
    label: 'Investissement Locatif Particulier',
    key: 'b4',
  },
];

export const frequence = [
  {
    label: 'Mensuelle',
    key: Frequency.monthly,
  },
  {
    label: 'Trimestrielle',
    key: Frequency.quarterly,
  },
  {
    label: 'Annuelle',
    key: Frequency.annual,
  },
];

export const derniereEcheance = [
  {
    label: 'Locataire',
    key: 'b1',
  },
  {
    label: 'Début de Bail',
    key: 'b2',
  },
  {
    label: 'Fin de Bail',
    key: 'b3',
  },
];
