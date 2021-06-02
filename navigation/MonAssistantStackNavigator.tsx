import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMonAssistantParamList } from '../types';
import MonAssistant from '../screens/MonAssistantScreen/MonAssistant';
import DeclarationImpots from '../screens/MonAssistantScreen/Components/DeclarationImpots';
import DeclarationImpots2 from '../screens/MonAssistantScreen/Components/DeclarationImpots2';
// import PdfScreen from '../screens/MonAssistantScreen/Components/PdfScreen';
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
      name="declaration-impots"
      component={DeclarationImpots}
    />
    <Stack.Screen
      name="declaration-impots-2"
      component={DeclarationImpots2}
    />
    {/**         Quittance Loyer screens      */}
    <Stack.Screen
      name="quittance-loyer"
      component={QuittanceLoyer}
    />
    <Stack.Screen
      name="quittance-loyer-2"
      component={QuittanceLoyer2}
    />
  </Stack.Navigator>
);
