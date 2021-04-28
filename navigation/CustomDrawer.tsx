import React from 'react';
import {
  Drawer, DrawerItem, IndexPath, Layout, Text,
} from '@ui-kitten/components';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import comptesData from '../mockData/comptesData';
import { colors } from '../assets/styles';
import Icon from '../components/Icon/Icon';

// Icons
const GridIcon = (props) => (
  <Icon {...props} name="grid-outline" size={23} />
);

const MoneyIcon = (props) => (
  <Icon name="money" size={35} color={colors.green} />
);
const QuestionIcon = (props) => (
  <Icon name="question" size={35} color={colors.green} />
);

const BellIcon = (props) => (
  <Icon {...props} name="bell-outline" size={24} />
);

const PersonIcon = (props) => (
  <Icon {...props} name="person-outline" size={24} />
);

const HomeIcon = (props) => (
  <Icon {...props} name="home-outline" size={22} />
);

const PaperIcon = (props) => (
  <Icon {...props} name="file-text-outline1" size={22} />
);

const EmailIcon = (props) => (
  <Icon {...props} name="email-outline" size={22} />
);

const DrawerContent = ({ navigation, state }) => (
  <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
    <Layout>
      <Layout style={{
        margin: 24,
        marginHorizontal: 21,
        flexDirection: 'row',
      }}
      >
        {/* eslint-disable-next-line global-require */}
        <Image
          source={require('../assets/Icones_omedom/avatars/avatar_1.png')}
          style={{
            height: 41, width: 41, marginRight: 18, marginLeft: 9,
          }}
        />
        <Text style={{
          fontSize: 25, marginTop: 11, letterSpacing: 0.4, fontWeight: '600', color: '#b5b5b5',
        }}
        >
          {comptesData[0].title}
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
        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText, fontSize: 16.5 }}>
              Tableau de bord
            </Text>
          )}
          accessoryLeft={GridIcon}
          style={{
            ...styles.drawerItemContainer, height: 72, paddingLeft: 26, width: 214,
          }}
        />

        <DrawerItem
          title={() => (
            <Text style={styles.drawerItemText}>
              Mon Compte
            </Text>
          )}
          accessoryLeft={PersonIcon}
          style={{
            ...styles.drawerItemContainer, height: 69, width: 191, paddingLeft: 26,
          }}
        />

        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText }}>
              Mes Biens
            </Text>
          )}
          accessoryLeft={HomeIcon}
          style={{
            ...styles.drawerItemContainer, height: 68, paddingLeft: 26, width: 170,
          }}
        />
        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText, letterSpacing: 0.6 }}>
              Ma Trésorerie
            </Text>
          )}
          accessoryLeft={MoneyIcon}
          style={{ height: 66, paddingLeft: 31, width: 198 }}
        />

        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText }}>
              Mon Assistant
            </Text>
          )}
          accessoryLeft={PaperIcon}
          style={{
            ...styles.drawerItemContainer, height: 68, paddingLeft: 29, width: 199,
          }}
        />
        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText }}>
              Notifications
            </Text>
          )}
          accessoryLeft={BellIcon}
          style={{
            ...styles.drawerItemContainer, height: 67, paddingLeft: 28, width: 189,
          }}
        />
        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText }}>
              FAQ
            </Text>
          )}
          accessoryLeft={QuestionIcon}
          style={{
            ...styles.drawerItemContainer, height: 63, paddingLeft: 32, width: 129,
          }}
        />
        <DrawerItem
          title={() => (
            <Text style={{ ...styles.drawerItemText }}>
              Contact
            </Text>
          )}
          accessoryLeft={EmailIcon}
          style={{
            ...styles.drawerItemContainer, height: 75, paddingLeft: 31, width: 156,
          }}
        />
      </Drawer>
    </Layout>

    <Layout style={{
      paddingHorizontal: 26, paddingBottom: 18,
    }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Text style={{ fontSize: 17, letterSpacing: 0 }}>Déconnexion</Text>
      </TouchableOpacity>
    </Layout>

  </Layout>
);

export default DrawerContent;

const styles = StyleSheet.create({
  drawerItemText: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: colors.noir,
  },
  drawerItemContainer: {
    backgroundColor: 'transparent',
  },
});
