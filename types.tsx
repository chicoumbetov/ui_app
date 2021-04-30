import { InputProps } from '@ui-kitten/components';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  'MesBiens': undefined;
  'MesCharges': undefined;
  'TableauDeBord': undefined;
  'MonAssistant': undefined;
  'Notifications': undefined;
};

export type TabMesBiensParamList = {
  TabMesBiensScreen: undefined;
};

export type TabMesChargesParamList = {
  TabMesChargesScreen: undefined;
};

export type TabTableauDeBordParamList = {
  TabTableauDeBordScreen: undefined;
};

export type TabMonAssistantParamList = {
  TabMonAssistantScreen: undefined;
};

export type TabNotificationsParamList = {
  TabNotificationsScreen: undefined;
};

export type CompteType = {
  id: string,
  nom: string,
  prenom: string,
  typeBien: string,
  IBAN: string,
  bank: string,
};
