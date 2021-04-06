import {Feather, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabMesBiensScreen from '../screens/TabMesBiensScreen';
import TabMesChargesScreen from '../screens/TabMesChargeScreen';
import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen';
import TabMonAssistantScreen from '../screens/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen';

import {
    BottomTabParamList,
    TabMesBiensParamList,
    TabMesChargesParamList,
    TabMonAssistantParamList,
    TabNotificationsParamList,
    TabTableauDeBordParamList
} from '../types';
import LogoPicture from "../components/LogoPicture/LogoPicture";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Tableau de Bord"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Mes Biens"
                component={TabMesBiensNavigator}
                options={{
                    tabBarIcon: ({color}) => <Feather name="home" size={30} color={color}/>,
                }}

            />
            <BottomTab.Screen
                name="Mes Charges"
                component={TabMesChargesNavigator}
                options={{
                    tabBarIcon: ({color}) => <Feather name="trending-up" size={30} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Tableau de Bord"
                component={TabTableauDeBordNavigator}
                options={{
                    tabBarIcon: ({color}) => <Feather name="grid" size={30} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Mon Assistant"
                component={TabMonAssistantNavigator}
                options={{
                    tabBarIcon: ({color}) => <Feather name="file-text" size={30} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Notifications"
                component={TabNotificationsNavigator}
                options={{
                    tabBarIcon: ({color}) => <SimpleLineIcons name="bell" size={30} color={color}/>,
                }}
            />

        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
/*
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}
*/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

function TabMesBiensNavigator() {
    return (
        <TabMesBiensStack.Navigator>
            <TabMesBiensStack.Screen
                name="TabMesBiensScreen"
                component={TabMesBiensScreen}
                options={{
                    headerTitle: 'Tab Mes Biens',
                    headerLeftContainerStyle: {
                        marginLeft: 10,
                    },
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                    headerRight: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                    headerLeft: () => (
                        <Ionicons name={'arrow-back'} size={30}/>
                    )
                }}
            />
        </TabMesBiensStack.Navigator>
    );
}

const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

function TabMesChargesNavigator() {
    return (
        <TabMesChargesStack.Navigator>
            <TabMesChargesStack.Screen
                name="TabMesChargesScreen"
                component={TabMesChargesScreen}
                options={{
                    headerTitle: 'Tab Mes Charges',
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                    headerRight: () => (
                        <Ionicons name={'menu'} size={30}/>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 10,
                    },
                    headerLeft: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                }}
            />
        </TabMesChargesStack.Navigator>
    );
}

const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

function TabTableauDeBordNavigator() {
    return (
        <TabTableauDeBordStack.Navigator>
            <TabTableauDeBordStack.Screen
                name="TabTableauDeBordScreen"
                component={TabTableauDeBordScreen}
                options={{
                    headerTitle: 'Tableau De Bord',
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                    headerRight: () => (
                        <Ionicons name={'menu'} size={30}/>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 10,
                    },
                    headerLeft: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                }}
            />
        </TabTableauDeBordStack.Navigator>
    );
}

const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

function TabMonAssistantNavigator() {
    return (
        <TabMonAssistantStack.Navigator>
            <TabMonAssistantStack.Screen
                name="TabMonAssistantScreen"
                component={TabMonAssistantScreen}
                options={{
                    headerTitle: 'Mon Assistant',
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                    headerRight: () => (
                        <Ionicons name={'menu'} size={30}/>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 10,
                    },
                    headerLeft: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                }}
            />
        </TabMonAssistantStack.Navigator>
    );
}

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

function TabNotificationsNavigator() {
    return (
        <TabNotificationsStack.Navigator>
            <TabNotificationsStack.Screen
                name="TabNotificationsScreen"
                component={TabNotificationsScreen}
                options={{
                    headerTitle: 'Notifications',
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                    headerRight: () => (
                        <Ionicons name={'menu'} size={30}/>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 10,
                    },
                    headerLeft: () => (
                        <LogoPicture size={40}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixSVRB9a2CIGcPZS9tgtePi8Mtdqn0r_e_w&usqp=CAU'}/>
                    ),
                }}
            />
        </TabNotificationsStack.Navigator>
    );
}

