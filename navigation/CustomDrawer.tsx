import React from 'react';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => {
      // eslint-disable-next-line default-case
      switch (index.row) {
        case 0:
          navigation.navigate('Tableau de bord');
          break;
        case 1:
          navigation.navigate('Mon Compte');
          break;
        case 2:
          navigation.navigate('Mes Biens');
          break;
        case 3:
          navigation.navigate('Ma Trésorerie');
          break;
        case 4:
          navigation.navigate('FAQ');
          break;
        case 5:
          navigation.navigate('Notifications');
          break;
        case 6:
          navigation.navigate('MonAssistant');
          break;
        case 7:
          navigation.navigate('Contact');
          break;
      }
    }}
  >
    <DrawerItem title="Tableau de bord" />
    <DrawerItem title="Mon Compte" />
    <DrawerItem title="Mes Biens" />
    <DrawerItem title="Ma Trésorerie" />
    <DrawerItem title="FAQ" />
    <DrawerItem title="Notifications" />
    <DrawerItem title="Mon Assistant" />
    <DrawerItem title="Contact" />
  </Drawer>
);

export default DrawerContent;
