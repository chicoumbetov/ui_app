/**
 *
 *
 *
 */

import { Frequency, RentalType } from '../src/API';

export const typeRevenu = {
  loyer: {
    label: 'Loyer',
    key: 'loyer',
    ligneDeclarationImpot: {
      loyer: '211',
      charges: '212',
      frais_de_gestion: '221',
    },
  },
  caf: {
    label: 'CAF',
    key: 'caf',
    ligneDeclarationImpot: '211',
  },
  revenu_divers: {
    label: 'Revenu Divers',
    key: 'revenu_divers',
  },
};

export const typeCharge = {
  impots: {
    label: 'Impôts',
    key: 'impots',
  },
  eau: {
    label: 'Eau',
    key: 'eau',
  },
  electricite: {
    label: 'Electricité',
    key: 'electricite',
  },
  energie_chauffage: {
    label: 'Enérgie de chauffage',
    key: 'energie_chauffage',
  },
  frais_dpe: {
    label: 'Frais de diagnostic DPE',
    key: 'frais_dpe',
    ligneDeclarationImpot: '224',
  },
  assurance: {
    label: 'Assurance',
    key: 'assurance',
  },
  banque: {
    label: 'Crédit',
    key: 'banque',
  },
  charges_copropriete: {
    label: 'Charges de copropriété',
    key: 'charges_copropriete',
    ligneDeclarationImpot: '221',
  },
  remuneration_autre: {
    label: 'Rémunération des gardes, concierges, autres honoraires',
    key: 'remuneration_autre',
    ligneDeclarationImpot: '221',
  },
  indemnite_eviction: {
    label: 'Indemnité d’éviction et frais de relogement',
    key: 'indemnite_eviction',
    ligneDeclarationImpot: '226',
  },
  charges_syndic: {
    label: 'Charges de syndic',
    key: 'charges_syndic',
    ligneDeclarationImpot: '221',
  },
  frais_comptable: {
    label: 'Frais comptables',
    key: 'frais_comptable',
    ligneDeclarationImpot: '221',
  },
  frais_de_gestion: {
    label: 'Frais de gestion',
    key: 'frais_de_gestion',
    ligneDeclarationImpot: '221',
  },
  frais_divers: {
    label: 'Frais divers',
    key: 'frais_divers',
  },
};

export const typeImpots = {
  taxes_foncieres: {
    label: 'Taxes foncières',
    key: 'taxes_foncieres',
    ligneDeclarationImpot: {
      amount: '227',
      householdWaste: '0',
    },
  },
  taxes_habitation: {
    label: "Taxes d'habitation",
    key: 'taxes_habitation',
  },
  contribution_sociales: {
    label: 'Contribution sociales',
    key: 'contribution_sociales',
  },
};

export const typeAssurance = {
  assurance_bien: {
    label: 'Assurance',
    key: 'assurance_bien',
    ligneDeclarationImpot: '223',
  },
  loyer_impaye: {
    label: 'Loyer impayé',
    key: 'loyer_impaye',
    ligneDeclarationImpot: '223',
  },
  vacances_locatives: {
    label: 'Vacances locatives',
    key: 'vacances_locatives',
    ligneDeclarationImpot: '223',
  },
};

export const typeDivers = {
  mobilier: {
    label: 'Mobilier',
    key: 'mobilier',
  },
  telephone: {
    label: 'Téléphone',
    key: 'telephone',
  },
  internet: {
    label: 'Internet',
    key: 'internet',
  },
};

export const typeBanque = {
  frais_bancaires: {
    label: 'Frais bancaires',
    key: 'frais_bancaires',
  },
  mensualite_credit: {
    label: 'Mensualité crédit',
    key: 'mensualite_credit',
    ligneDeclarationImpot: {
      interest: '250',
      assurance: '223',
    },
  },
};

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

export const frequence = [
  {
    label: 'Mensuelle',
    key: Frequency.monthly,
  },
  {
    label: 'Semestrielle',
    key: Frequency.biannually,
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
export const rentalType = [
  {
    label: 'Meublé',
    key: RentalType.furnished,
  },
  {
    label: 'Non meublé',
    key: RentalType.unfurnished,
  },
];

export const derniereEcheance = [
  {
    label: 'Locataire',
    key: 'b1',
  },
  {
    label: 'Début de bail',
    key: 'b2',
  },
  {
    label: 'Fin de bail',
    key: 'b3',
  },
];
