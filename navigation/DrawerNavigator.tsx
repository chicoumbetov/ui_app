import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {Ionicons} from '@expo/vector-icons';
import MonCompteScreen from '../screens/MonCompteScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen';
import TabMonAssistantScreen from '../screens/TabMonAssistantScreen';
import TabMaTresorerieScreen from '../screens/TabMaTresorerieScreen';
import TabFaqScreen from '../screens/TabFaqScreen';
import TabContactScreen from '../screens/TabContactScreen';
import ConnexionScreen from '../screens/ConnextionScreen';

import BottomTabNavigator from './BottomTabNavigator';
import LogoPicture from '../components/LogoPicture/LogoPicture';
import Icon from '../components/Icon/Icon';

import {TouchableOpacity} from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {

    return (
        <>
            <Drawer.Navigator initialRouteName="Tableau de bord">
                <Drawer.Screen
                    name="Tableau de bord"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <LogoPicture />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                                <Ionicons name="menu" size={30} />
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="grid-outline" {...{color}} size={30}/>;
                        },

                    }}
                />
                <Drawer.Screen
                    name="Mon Compte"
                    component={MonCompteScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <LogoPicture />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                                <Ionicons name="menu" size={30} />
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="person-outline" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Mes Biens"
                    component={TabMesBiensScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <LogoPicture />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                                <Ionicons name="menu" size={30} />
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="home-outline" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Ma Trésorerie"
                    component={TabMaTresorerieScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <LogoPicture/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="menu" size={30}/>
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="money" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Mon Assistant"
                    component={TabMonAssistantScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <LogoPicture/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="menu" size={30}/>
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="file-text-outline" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Notifications"
                    component={TabNotificationsScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <LogoPicture/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="menu" size={30}/>
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="bell-outline" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="FAQ"
                    component={TabFaqScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <LogoPicture/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="menu" size={30}/>
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="question" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Contact"
                    component={TabContactScreen}
                    options={{
                        headerShown: true,
                        headerLeftContainerStyle: {
                            marginLeft: 10,
                        },
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <LogoPicture/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="menu" size={30}/>
                            </TouchableOpacity>
                        ),
                        drawerIcon: function getIcon({color}: { color: string }) {
                            return <Icon name="email-outline" {...{color}} size={30}/>;
                        },
                    }}
                />
                <Drawer.Screen name="Déconnexion" component={ConnexionScreen}/>
            </Drawer.Navigator>
        </>
    )
}

export default DrawerNavigator;
