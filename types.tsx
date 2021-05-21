/**
 * 1. Navigation Stack Param List types
 * 2. ... types
 * 3. ... types
 * */

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
  'modifier-info-2': {
    signUp?:boolean
  };
  'modifier-info-3': {
    signUp?:boolean
  };
  CameraDom: undefined;
  ModifierAbonnement: undefined;
};

export type TabMesBiensParamList = {
  'mes-biens': undefined;
  'detail-bien': { id: string };
  MonBudget: undefined;
  'ajout-revenu': undefined;
  ParametrerAjoutCharges: undefined;
  PartagerBien: undefined;
  'modifier-characteristique': undefined;
  'ajout-bien-screen': undefined;
  'mes-rapports': undefined;
  'mes-rapports-biens1': undefined;
  'mes-rapports-biens2': undefined;
};

export type TabMaTresorerieParamList = {
  'ma-tresorerie': undefined;
  'ma-tresorerie-2': undefined;
  TresoMouvement_page1: undefined;
  TresoMouvement_page2: undefined;
  IgnorerMouvement: undefined;
  AjoutCompte: undefined;
};

export type TabMonAssistantParamList = {
  'mon-assistant': undefined;
  DeclarationImpots: undefined;
  DeclarationImpots2: undefined;
  PdfScreen: undefined;
  QuittanceLoyer: undefined;
  QuittanceLoyer2: undefined;
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
