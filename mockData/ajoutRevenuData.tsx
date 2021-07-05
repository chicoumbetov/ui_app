/**
 *
 *
 *
 */

import { Frequency } from '../src/API';

export const typeRevenu = {
  loyer: {
    label: 'Loyer',
    key: 'loyer',
  },
  caf: {
    label: 'CAF',
    key: 'caf',
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
  },
  assurance: {
    label: 'Assurance',
    key: 'assurance',
  },
  banque: {
    label: 'Banque',
    key: 'banque',
  },
  charges_copropriete: {
    label: 'Charges de copropriété',
    key: 'charges_copropriete',
  },
  remuneration_autre: {
    label: 'Rémunération des gardes, concierges, autres honoraires',
    key: 'remuneration_autre',
  },
  frais_comptable: {
    label: 'Frais Comptables',
    key: 'frais_comptable',
  },
  frais_de_gestion: {
    label: 'Frais de Gestion',
    key: 'frais_de_gestion',
  },
  frais_divers: {
    label: 'Frais divers',
    key: 'frais_divers',
  },
};

export const typeImpots = {
  taxes_foncieres: {
    label: 'Taxes Foncières',
    key: 'taxes_foncieres',
  },
  taxes_habitation: {
    label: "Taxes d'Habitation",
    key: 'taxes_habitation',
  },
  contribution_sociales: {
    label: 'Contribution Sociales',
    key: 'contribution_sociales',
  },
};

export const typeAssurance = {
  assurance_bien: {
    label: 'Assurance du Bien',
    key: 'assurance_bien',
  },
  loyer_impaye: {
    label: 'Loyer Impayé',
    key: 'loyer_impaye',
  },
  vacances_locatives: {
    label: 'Vacances Locatives',
    key: 'vacances_locatives',
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
    label: 'Frais Bancaires',
    key: 'frais_bancaires',
  },
  mensualite_credit: {
    label: 'Mensualité Crédit',
    key: 'mensualite_credit',
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
