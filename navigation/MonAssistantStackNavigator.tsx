import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMonAssistantParamList } from '../types';
import MonAssistant from '../screens/MonAssistantScreen/MonAssistant';
import DeclarationImpots from '../screens/MonAssistantScreen/Components/DeclarationImpots';
import DeclarationImpots2 from '../screens/MonAssistantScreen/Components/DeclarationImpots2';
import PdfScreen from '../screens/MonAssistantScreen/Components/PdfScreen';
import QuittanceLoyer from '../screens/MonAssistantScreen/Components/QuittanceLoyer';
import QuittanceLoyer2 from '../screens/MonAssistantScreen/Components/QuittanceLoyer2';

/** Mon Assistant Section */
const Stack = createStackNavigator<TabMonAssistantParamList>();

export default () => (
  <Stack.Navigator
    initialRouteName="mon-assistant"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="mon-assistant"
      component={MonAssistant}
    />
    {/**         Declaration impots screens      */}
    <Stack.Screen
      name="DeclarationImpots"
      component={DeclarationImpots}
    />
    <Stack.Screen
      name="DeclarationImpots2"
      component={DeclarationImpots2}
    />

    {/**         Pdf component      */}
    <Stack.Screen
      name="PdfScreen"
      component={PdfScreen}
    />

    {/**         Quittance Loyer screens      */}
    <Stack.Screen
      name="QuittanceLoyer"
      component={QuittanceLoyer}
    />
    <Stack.Screen
      name="QuittanceLoyer2"
      component={QuittanceLoyer2}
    />
  </Stack.Navigator>
);
