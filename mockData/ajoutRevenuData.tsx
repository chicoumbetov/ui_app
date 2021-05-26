import { Frequency } from '../src/API';

export const typeRevenu = [
  {
    label: 'Loyer',
    key: 'Loyer',
  },
  {
    label: 'CAF',
    key: 'CAF',
  },
  {
    label: 'Revenu Divers',
    key: 'Revenu Divers',
  },
];

export const typeCharge = [
  {
    label: 'Impôts',
    key: 'Impôts',
  },
  {
    label: 'Eau',
    key: 'Eau',
  },
  {
    label: 'Electricité',
    key: 'Electricité',
  },
  {
    label: 'Assurance',
    key: 'Assurance',
  },
  {
    label: 'Banque',
    key: 'Banque',
  },
  {
    label: 'Charges de copropriété',
    key: 'Charges de copropriété',
  },
  {
    label: 'Frais Comptables',
    key: 'Frais Comptables',
  },
  {
    label: 'Frais de Gestion',
    key: 'Frais de Gestion',
  },
  {
    label: 'Frais divers',
    key: 'Frais divers',
  },
];

export const typeImpots = [
  {
    label: 'Taxes Foncières',
    key: 'Taxes Foncières',
  },
  {
    label: "Taxes d'Habitation",
    key: "Taxes d'Habitation",
  },
  {
    label: 'Contribution Sociales',
    key: 'Contribution Sociales',
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
    label: 'Bimensuel',
    key: Frequency.fortnightly,
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
