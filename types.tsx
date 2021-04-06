export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  "Mes Biens": undefined;
  "Mes Charges": undefined;
  "Tableau de Bord": undefined;
  "Mon Assistant": undefined;
  "Notifications": undefined;
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
}

