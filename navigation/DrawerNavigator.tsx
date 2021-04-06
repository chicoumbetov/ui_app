import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import MonCompteScreen from "../screens/MonCompteScreen";
import TabMesBiensScreen from "../screens/TabMesBiensScreen";
import TabNotificationsScreen from "../screens/TabNotificationsScreen";
import TabMonAssistantScreen from "../screens/TabMonAssistantScreen";
import TabMaTresorerieScreen from "../screens/TabMaTresorerieScreen";
import TabFaqScreen from "../screens/TabFaqScreen";
import TabContactScreen from "../screens/TabContactScreen";
import ConnexionScreen from "../screens/ConnextionScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import {Ionicons} from "@expo/vector-icons";
import LogoPicture from "../components/LogoPicture/LogoPicture";
import Icon from '../components/Icon/Icon';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Page d'Accueil">
            <Drawer.Screen
                name="Page d'Accueil"
                component={BottomTabNavigator}
                options={{
                    headerLeft: () => (
                        <Ionicons name={'arrow-back'} size={30}/>
                    ),
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="grid-outline" {...{color}} />;
                    },

                }}
            />
            <Drawer.Screen
                name="Mon Compte"
                component={MonCompteScreen}
                options={{
                    headerLeft: () => (
                        <Ionicons name={'arrow-back'} size={30}/>
                    ),
                    headerRight: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="grid-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen name="Mes Biens" component={TabMesBiensScreen}
                           options={{
                               drawerIcon: function getIcon({color}: { color: string }) {
                                   return <Icon name="grid-outline" {...{color}} />;
                               },
                           }}
            />
            <Drawer.Screen
                name="Ma Trésorerie" component={TabMaTresorerieScreen}
                options={{
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="home-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen
                name="Mon Assistant"
                component={TabMonAssistantScreen}
                options={{
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="home-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen
                name="Notifications" component={TabNotificationsScreen}
                options={{
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="home-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen
                name="FAQ" component={TabFaqScreen}
                options={{
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="home-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen
                name="Contact" component={TabContactScreen}
                options={{
                    drawerIcon: function getIcon({color}: { color: string }) {
                        return <Icon name="home-outline" {...{color}} />;
                    },
                }}
            />
            <Drawer.Screen name="Déconnexion" component={ConnexionScreen}/>
        </Drawer.Navigator>

    );
}

export default DrawerNavigator
