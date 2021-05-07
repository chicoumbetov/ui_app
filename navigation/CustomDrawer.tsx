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
  ImageProps, TouchableOpacity,
} from 'react-native';
import {InitialState, useLinkTo} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { RenderProp } from '@ui-kitten/components/devsupport';
import comptesData from '../mockData/comptesData';
import Icon, { IconName } from '../components/Icon/Icon';
import ManAvatar from '../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import {Icon as IconUIKitten} from '@ui-kitten/components';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * 2. Icons
 */
// Icons
// eslint-disable-next-line max-len
type IconProps = {
  name: IconName, uikitten?: false
} | {
  name: string, uikitten: true
};

const IconGenerator = ({name, uikitten}: IconProps): RenderProp<Partial<ImageProps>> => (props?: Partial<ImageProps>) => {
  let width;
  let color;
  if (props) {
    const { style } = props;
    if (style) {
      // @ts-ignore : Dans le cas de UI KItten ce sera une ImageProps
      width = style.width;
      // @ts-ignore : Dans le cas de UI KItten ce sera une ImageProps
      color = style.tintColor;
    }
  }
  if (uikitten) {
    return <IconUIKitten name={name} fill={color} style={{width, height : props?.style?.height}}/>;
  }

  {/* Dans le cas de Icomoon on à uikitten === false ou undefined (cf. type)
      @ts-expect-error */}
  return <Icon name={name} size={width} color={color} />;
};

const GridIcon = IconGenerator({name: 'grid-outline', uikitten: true});

const MoneyIcon = IconGenerator({name: 'money'});

const QuestionIcon = IconGenerator({name: 'question'});

const BellIcon = IconGenerator({name: 'bell-outline', uikitten: true});

const PersonIcon = IconGenerator({name: 'person-outline', uikitten: true});

const HomeIcon = IconGenerator({name: 'home-outline', uikitten: true});

const PaperIcon = IconGenerator({name: 'file-text-outline', uikitten: true});

const EmailIcon = IconGenerator({name: 'email-outline', uikitten: true});

function findIndexByRouteName(name?: string) {
  switch (name) {
    case '':
      return 0;
    case 'mon-compte-nav':
      return 1;
    case 'mes-biens-nav':
      return 2;
    case 'ma-tresorerie-nav':
      return 3;
    case 'mon-assistant-nav':
      return 4;
    case 'notifications':
      return 5;
    case 'faq':
      return 6;
    case 'contact':
      return 7;
    default:
      return null;
  }
}

function findFocusedDrawerItem(state: InitialState) {
  let current: InitialState | undefined = state;

  while (current?.routes[current.index ?? 0].state != null) {
    const drawerIndex = findIndexByRouteName(current?.routes[current.index ?? 0].name);
    if (drawerIndex !== null) {
      return drawerIndex;
    }
    current = current.routes[current.index ?? 0].state;
  }

  const drawerIndex = findIndexByRouteName(current?.routes[current.index ?? 0].name);
  if (drawerIndex !== null) {
    return drawerIndex;
  }

  return 0;
}

/**
 * 3. Custom Drawer itself
 */
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props;
  const inset = useSafeAreaInsets();
  const linkTo = useLinkTo();
  return (
    <DrawerContentScrollView style={{ flex: 1}} contentContainerStyle={{ flex: 1}}>
        <Layout style={{ flex: 1, justifyContent: 'space-between' }}>

          <Layout>
            <Layout style={{
              margin: 24,
              marginHorizontal: 21,
              flexDirection: 'row',
            }}
            >
              <ManAvatar height={41} width={41} style={{ marginRight: 18, marginLeft: 9 }} />
              <Text category="h2" appearance="hint" style={{ marginTop: 11 }}>
                {comptesData[0].title}
              </Text>
            </Layout>
            <Drawer
              selectedIndex={new IndexPath(findFocusedDrawerItem(state))}
              onSelect={(index) => {
                console.log(index);
                // eslint-disable-next-line default-case
                switch (index.row) {
                  case 0:
                    linkTo('/tableau-de-bord');
                    break;
                  case 1:
                    linkTo('/mon-compte');
                    break;
                  case 2:
                    linkTo('/mes-biens');
                    break;
                  case 3:
                    linkTo('/ma-tresorerie');
                    break;
                  case 4:
                    linkTo('/mon-assistant');
                    break;
                  case 5:
                    linkTo('/notifications');
                    break;
                  case 6:
                    linkTo('/faq');
                    break;
                  case 7:
                    linkTo('/contact');
                    break;
                }
              }}
            >
              <DrawerItem
                title="Tableau de bord"
                accessoryLeft={GridIcon}
              />
              <DrawerItem
                title="Mon Compte"
                accessoryLeft={PersonIcon}
              />
              <DrawerItem
                title="Mes Biens"
                accessoryLeft={HomeIcon}
              />
              <DrawerItem
                title="Ma Trésorerie"
                accessoryLeft={MoneyIcon}
              />
              <DrawerItem
                title="Mon Assistant"
                accessoryLeft={PaperIcon}
              />
              <DrawerItem
                title="Notifications"
                accessoryLeft={BellIcon}
              />
              <DrawerItem
                title="FAQ"
                accessoryLeft={QuestionIcon}
              />
              <DrawerItem
                title="Contact"
                accessoryLeft={EmailIcon}
              />
            </Drawer>
          </Layout>

          <Layout style={{
            paddingHorizontal: 29, marginBottom: 10 + inset.bottom
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
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
