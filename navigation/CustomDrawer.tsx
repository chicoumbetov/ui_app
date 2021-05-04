/**
 * Custom drawer navigation
 *
 * @author: David BUCH, Shynggys UMBETOV
 */

/** Contenu:
 * 1. imports
 * 2. Icons
 * 3. Custom Drawer itself
 */

/**
 * 1. imports
 */
import React from 'react';
import {
  Drawer, DrawerItem, IndexPath, Layout, Text,
} from '@ui-kitten/components';
import {
  Image, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import comptesData from '../mockData/comptesData';
import { colors } from '../assets/styles';
import Icon from '../components/Icon/Icon';

/**
 * 2. Icons
 */
// Icons
const GridIcon = () => (
  <Icon name="grid-outline" size={35} />
);

const MoneyIcon = () => (
  <Icon name="money" size={35} />
);
const QuestionIcon = () => (
  <Icon name="question" size={35} />
);

const BellIcon = () => (
  <Icon name="bell-outline" size={29} />
);

const PersonIcon = () => (
  <Icon name="person-outline" size={35} />
);

const HomeIcon = () => (
  <Icon name="home-outline" size={30} />
);

const PaperIcon = () => (
  <Icon name="file-text-outline1" size={28} />
);

const EmailIcon = () => (
  <Icon name="email-outline" size={25} />
);

/**
 * 3. Custom Drawer itself
 */
const CustomDrawer = ({ state }) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
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
                  navigation.navigate('TableauDeBordDrawer');
                  break;
                case 1:
                  navigation.navigate('MonCompteDrawer');
                  break;
                case 2:
                  navigation.navigate('MesBiensDrawer');
                  break;
                case 3:
                  navigation.navigate('MaTrésorerieDrawer');
                  break;
                case 4:
                  navigation.navigate('MonAssistantDrawer');
                  break;
                case 5:
                  navigation.navigate('NotificationsDrawer');
                  break;
                case 6:
                  navigation.navigate('FaqDrawer');
                  break;
                case 7:
                  navigation.navigate('ContactDrawer');
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
                ...styles.drawerItemContainer, height: 68, width: 214, marginTop: 6,
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
                ...styles.drawerItemContainer, height: 66, width: 191,
              }}
            />

            <DrawerItem
              title={() => (
                <Text style={{ ...styles.drawerItemText, marginTop: 9 }}>
                  Mes Biens
                </Text>
              )}
              accessoryLeft={HomeIcon}
              style={{
                ...styles.drawerItemContainer,
                height: 67,
                width: 170,
                marginTop: -2,
              }}
            />
            <DrawerItem
              title={() => (
                <Text style={{ ...styles.drawerItemText, letterSpacing: 0.6 }}>
                  Ma Trésorerie
                </Text>
              )}
              accessoryLeft={MoneyIcon}
              style={{
                ...styles.drawerItemContainer, height: 65, paddingLeft: 32, marginTop: 5, width: 198,
              }}
            />

            <DrawerItem
              title={() => (
                <Text style={{ ...styles.drawerItemText }}>
                  Mon Assistant
                </Text>
              )}
              accessoryLeft={PaperIcon}
              style={{
                ...styles.drawerItemContainer,
                height: 61,
                paddingLeft: 37,
                width: 198.5,
                marginTop: 3,
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
                ...styles.drawerItemContainer, height: 70, paddingLeft: 36, width: 189,
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
                ...styles.drawerItemContainer, height: 63, paddingLeft: 32, width: 128,
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
                ...styles.drawerItemContainer, height: 77, paddingLeft: 39, width: 156,
              }}
            />
          </Drawer>
        </Layout>

        <Layout style={{
          paddingHorizontal: 29, paddingBottom: 24,
        }}
        >
          <TouchableOpacity onPress={() => {
            Auth.signOut();
          }}
          >
            <Text style={{ fontSize: 17, letterSpacing: 0 }}>Déconnexion</Text>
          </TouchableOpacity>
        </Layout>

      </Layout>
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerItemText: {
    fontSize: 16,
    fontFamily: 'HouschkaRoundedDemiBold',
    letterSpacing: 0.5,
    color: colors.noir,
  },
  drawerItemContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 33,
  },
});
