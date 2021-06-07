import { RealEstateItem } from './src/API/RealEstate';

/**
 * 1. Navigation Stack Param List types
 * 2. ... types
 * 3. ... types
 * */

export type MonBienProps = { bien: RealEstateItem };

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

/**
 * Stack Param List types:
 *
 * BottomTabParamList
 * 1. Tableau de bord
 * 2. Mon Compte
 * 3. Mes Biens
 * 4. Ma Tresorerie
 * 5. Mon Assistant
 * 6. Notifications
 * 7. Faq
 * 8. Contact
 * 9. Mes charges
 * 10. Ajout Bien
 * */

export type BottomTabParamList = {
  'mes-biens-nav': undefined;
  'mes-charges-nav': undefined;
  'tableau-de-bord': undefined;
  'mon-assistant-nav': undefined;
  'notifications': undefined;
};

export type TabTableauDeBordParamList = {
  TableauDeBord: undefined;
  AjoutBienScreen: undefined;
  CameraDom: undefined;
};

export type TabMonCompteParamList = {
  'mon-compte': undefined;
  'modifier-info-1': undefined;
  'verification': undefined;
  'modifier-info-2': {
    signUp?:boolean
  };
  'modifier-info-3': {
    signUp?:boolean
  };
  ModifierAbonnement: undefined;
};

export type TabMesBiensParamList = {
  'mes-biens': undefined;
  'detail-bien': { id: string };
  'mon-budget': { id: string };
  'ajout-revenu': { id: string };
  'modifier-revenu': { id: string, idBudgetLine: string };

  'ajout-charge': { id: string };
  'modifier-charge': { id: string, idBudgetLine: string };

  ParametrerAjoutCharges: { id: string };
  'partager-bien': { id: string };
  'modifier-characteristique': { id: string };
  'ajout-bien-screen': undefined;
  'mes-rapports': undefined;
  'mes-rapports-biens1': { id: string };
  'mes-rapports-biens2': { id: string };
};

export type TabMaTresorerieParamList = {
  'ma-tresorerie': { id: string };
  'ma-tresorerie-2': { id: string };
  'mouv-bancaires': { id: string };
  'ignorer-mouvement': { id: string };

  TresoMouvement_page1: undefined;
  TresoMouvement_page2: undefined;

  AjoutCompte: undefined;

  'treso-mouvement-page1': undefined;
  'treso-mouvement-page2': undefined;
};

export type TabMonAssistantParamList = {
  'mon-assistant': undefined;
  'declaration-impots': { id: string };
  'declaration-impots-2': { id: string, anneeEcheance: number };
  'pdf-screen': undefined;
  'quittance-loyer': { id: string };
  'quittance-loyer-2': { idBien: string, date: string, idTenant: string };
};

export type TabMesChargesParamList = {
  'mes-charges': undefined;
  MesCharges2: undefined;
  MesCharges3: undefined;
};

export type AjoutBienParamList = {
  AjoutBienScreen: undefined;
  CameraDom: undefined;
};

/**
 * ... types:
 * 1.
 * 2.
 * */
export type CompteType = {
  title: string,
  id?: string,
  data?: ClientType
};

export type ClientType = {
  id: string,
  nom?: string,
  prenom: string,
  typeBien?: string,
  IBAN?: string,
  bank?: string,
};
