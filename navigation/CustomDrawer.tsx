import React from 'react';
import {
  Drawer, DrawerItem, IndexPath, Layout, Text, Icon,
} from '@ui-kitten/components';
import { Image, TouchableOpacity } from 'react-native';
import comptesData from '../mockData/comptesData';

// Icons for DrawerNavigation Items
const GridIcon = (props) => (
  <Icon {...props} name="grid-outline" />
);

const BellIcon = (props) => (
  <Icon {...props} name="bell-outline" />
);

const PersonIcon = (props) => (
  <Icon {...props} name="person-outline" />
);

const HomeIcon = (props) => (
  <Icon {...props} name="home-outline" />
);

const PaperIcon = (props) => (
  <Icon {...props} name="file-text-outline" />
);

const EmailIcon = (props) => (
  <Icon {...props} name="email-outline" />
);

const DrawerContent = ({ navigation, state }) => (
  <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
    <Layout>
      <Layout style={{
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      }}
      >
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../assets/Icones_omedom/logements/icones_log1.png')} style={{ height: 50, width: 50, marginRight: 12 }} />
        <Text style={{ fontSize: 24, fontWeight: '600', color: '#b5b5b5' }}>
          {' '}
          Mathieu
          {' '}
          {comptesData.prenom}
        </Text>
      </Layout>
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => {
          // eslint-disable-next-line default-case
          switch (index.row) {
            case 0:
              navigation.navigate('TableauDeBord');
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
              navigation.navigate('MonAssistant');
              break;
            case 5:
              navigation.navigate('Notifications');
              break;
            case 6:
              navigation.navigate('FAQ');
              break;
            case 7:
              navigation.navigate('Contact');
              break;
          }
        }}
      >
        <DrawerItem title="Tableau de bord" accessoryLeft={GridIcon} />
        <DrawerItem title="Mon Compte" accessoryLeft={PersonIcon} />
        <DrawerItem title="Mes Biens" accessoryLeft={HomeIcon} />
        <DrawerItem title="Ma Trésorerie" accessoryLeft={GridIcon} />
        <DrawerItem title="Mon Assistant" accessoryLeft={PaperIcon} />
        <DrawerItem title="Notifications" accessoryLeft={BellIcon} />
        <DrawerItem title="FAQ" accessoryLeft={GridIcon} />
        <DrawerItem title="Contact" accessoryLeft={EmailIcon} />
      </Drawer>
    </Layout>
    <Layout style={{
      paddingHorizontal: 26, paddingBottom: 18,
    }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Text style={{ letterSpacing: 0 }}>Déconnexion</Text>
      </TouchableOpacity>
    </Layout>
  </Layout>
);

export default DrawerContent;
