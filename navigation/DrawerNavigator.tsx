import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MonCompteScreen from "../screens/MonCompteScreen";
import TabMesBiensScreen from "../screens/TabMesBiensScreen";
import TabNotificationsScreen from "../screens/TabNotificationsScreen";
import TabMonAssistantScreen from "../screens/TabMonAssistantScreen";
import TabMaTresorerieScreen from "../screens/TabMaTresorerieScreen";
import TabFaqScreen from "../screens/TabFaqScreen";
import TabContactScreen from "../screens/TabContactScreen";
import ConnexionScreen from "../screens/ConnextionScreen";

import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
            <Drawer.Navigator initialRouteName="Page d'Accueil" >
                <Drawer.Screen
                    name="Page d'Accueil"
                    component={BottomTabNavigator}

                />
                <Drawer.Screen
                    name="Mon Compte"
                    component={MonCompteScreen}
                />
                <Drawer.Screen name="Mes Biens" component={TabMesBiensScreen} />
                <Drawer.Screen name="Ma Trésorerie" component={TabMaTresorerieScreen} />
                <Drawer.Screen name="Mon Assistant" component={TabMonAssistantScreen} />
                <Drawer.Screen name="Notifications" component={TabNotificationsScreen} />
                <Drawer.Screen name="FAQ" component={TabFaqScreen} />
                <Drawer.Screen name="Contact" component={TabContactScreen} />
                <Drawer.Screen name="Déconnexion" component={ConnexionScreen} />
            </Drawer.Navigator>

    );
}

export default DrawerNavigator