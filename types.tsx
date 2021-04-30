import { InputProps } from '@ui-kitten/components';

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
  'MesBiensBottom': undefined;
  'MesChargesBottom': undefined;
  'TableauDeBordBottom': undefined;
  'MonAssistantBottom': undefined;
  'NotificationsBottom': undefined;
};

export type TabTableauDeBordParamList = {
  TableauDeBord: undefined;
  AjoutBienScreen: undefined;
  CameraDom: undefined;
};

export type TabMonCompteParamList = {
  MonCompte: undefined;
  ModifierInfo1: undefined;
  ModifierInfo2: undefined;
  ModifierInfo3: undefined;
  CameraDom: undefined;
};

export type TabMesBiensParamList = {
  MesBiens: undefined;
  DetailsBien: undefined;
  MonBudget: undefined;
  ParametrerAjoutRevenu: undefined;
  ParametrerAjoutCharges: undefined;
  PartagerBien: undefined;
  ModifierCharacteristiques: undefined;
};

export type TabMaTresorerieParamList = {
  MaTresorerie: undefined;
  TresoMouvement_page1: undefined;
  TresoMouvement_page2: undefined;
  IgnorerMouvement: undefined;
  AjoutCompte: undefined;
};

export type TabMonAssistantParamList = {
  MonAssistant: undefined;
  DeclarationImpots: undefined;
  DeclarationImpots2: undefined;
  PdfScreen: undefined;
  QuittanceLoyer: undefined;
  QuittanceLoyer2: undefined;
};

export type TabNotificationsParamList = {
  Notifications: undefined;
};

export type TabFaqParamList = {
  Faq: undefined;
};

export type TabContactParamList = {
  Contact: undefined;
  Contact2: undefined;
};

export type TabMesChargesParamList = {
  TabMesChargesScreen: undefined;
  MesCharges1: undefined;
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
  id: string,
  nom: string,
  prenom: string,
  typeBien: string,
  IBAN: string,
  bank: string,
};
