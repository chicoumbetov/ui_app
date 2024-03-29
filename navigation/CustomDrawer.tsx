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
  Icon as IconUIKitten, useTheme,
} from '@ui-kitten/components';
import {
  ImageProps, Pressable, ScaledSize, TouchableOpacity, View,
} from 'react-native';
import {
  DrawerActions, InitialState, useLinkTo, useNavigation,
} from '@react-navigation/native';
import Auth from '@aws-amplify/auth';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { RenderProp } from '@ui-kitten/components/devsupport';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDimensions } from '@react-native-community/hooks';
// import comptesData from '../mockData/comptesData';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import Icon, { IconName } from '../components/Icon/Icon';
import AutoAvatar from '../components/AutoAvatar';
import { useUser } from '../src/API/UserContext';
import debounce from '../utils/debounce';
import { useCountUnseenNotification } from '../src/API/Notification';

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

// eslint-disable-next-line max-len
const IconGenerator = ({ name, uikitten }: IconProps): RenderProp<Partial<ImageProps>> => (props?: Partial<ImageProps>) => {
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
    return (
      <IconUIKitten
        name={name}
        fill={color}
              // @ts-ignore : Dans le cas de UI KItten ce sera une ImageProps
        style={{ width, height: props?.style?.height }}
      />
    );
  }

  /* Dans le cas de Icomoon on à uikitten === false ou undefined (cf. type)
        @ts-expect-error */
  return <Icon name={name} size={width} color={color} />;
};

const GridIcon = IconGenerator({ name: 'grid-outline', uikitten: true });

const MoneyIcon = IconGenerator({ name: 'money' });

const QuestionIcon = IconGenerator({ name: 'question' });

const BellIcon = IconGenerator({ name: 'bell-outline', uikitten: true });

const PersonIcon = IconGenerator({ name: 'person-outline', uikitten: true });

const HomeIcon = IconGenerator({ name: 'home-outline', uikitten: true });

const ChargeIcon = IconGenerator({ name: 'trending-up-outline', uikitten: true });

const PaperIcon = IconGenerator({ name: 'file-text-outline', uikitten: true });

const EmailIcon = IconGenerator({ name: 'email-outline', uikitten: true });
const CadenaIcon = IconGenerator({ name: 'lock-outline', uikitten: true });

function findIndexByRouteName(name?: string, window: ScaledSize) {
  const toAdd = window.width > 780 ? 0 : 1;

  switch (name) {
    case 'tableau-de-bord':
      return 0;
    case 'mon-compte-nav':
      return 1;
    case 'mes-charges-nav':
      return 2;
    case 'mes-biens-nav':
      return 3 - toAdd;
    case 'ma-tresorerie-nav':
      return 4 - toAdd;
    case 'mon-assistant-nav':
      return 5 - toAdd;
    case 'notifications':
      return 6 - toAdd;
      /** Waiting FAQ data
    case 'faq':
      return 7 - toAdd;
       */
    case 'contact':
      return 7 - toAdd;
    default:
      return null;
  }
}

function findFocusedDrawerItem(state: InitialState, window: ScaledSize) {
  let current: InitialState | undefined = state;

  while (current?.routes[current.index ?? 0].state != null) {
    const drawerIndex = findIndexByRouteName(current?.routes[current.index ?? 0].name, window);
    if (drawerIndex !== null) {
      return drawerIndex;
    }
    current = current.routes[current.index ?? 0].state;
  }

  const drawerIndex = findIndexByRouteName(current?.routes[current.index ?? 0].name, window);
  if (drawerIndex !== null) {
    return drawerIndex;
  }

  return 0;
}

/**
 * 3. Custom Drawer itself
 */
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { state } = props;
  const { user } = useUser();
  const theme = useTheme();
  const countNotification = useCountUnseenNotification();
  const inset = useSafeAreaInsets();
  const linkTo = useLinkTo();
  const { window } = useDimensions();

  const navigation = useNavigation();

  const closeDrawer = React.useCallback(
    debounce(() => {
      navigation.dispatch(DrawerActions.closeDrawer());
    }, 50),
    [navigation],
  );
  return (
    <View style={{ flex: 1, marginTop: inset.top, marginBottom: inset.bottom }}>
      <Layout level="4" style={{ flex: 1, justifyContent: 'space-between' }}>

        <Pressable
          onPress={() => linkTo('/mon-compte')}
          style={{
            margin: 24,
            marginHorizontal: 21,
            flexDirection: 'row',
          }}
        >
          <AutoAvatar
            style={{
              height: 41,
              width: 41,
              borderRadius: 21,
              overflow: 'hidden',
              marginRight: 18,
              marginLeft: 9,
            }}
            avatarInfo={user?.avatarUri || 'default::ManAvatar'}
          />
          <Text category="h2" appearance="hint" style={{ marginTop: 11 }}>
            {user?.firstname || undefined}
          </Text>
        </Pressable>
        <Drawer
          selectedIndex={new IndexPath(findFocusedDrawerItem(state, window))}
          onSelect={(index) => {
            // console.log(index);
            const toAdd = window.width > 780 ? 0 : 1;
            // eslint-disable-next-line default-case
            switch (index.row) {
              case 0:
                linkTo('/tableau-de-bord');
                break;
              case 1:
                linkTo('/mon-compte');
                break;
              case 3 - toAdd:
                linkTo('/mes-biens');
                break;
              case 4 - toAdd:
                linkTo('/ma-tresorerie');
                break;
              case 5 - toAdd:
                linkTo('/mon-assistant');
                break;
              case 6 - toAdd:
                linkTo('/notifications');
                break;
                /** Waiting FAQ data
              case 7 - toAdd:
                linkTo('/faq');
                break;
                 */
              case 7 - toAdd:
                linkTo('/contact');
                break;
              case 8 - toAdd:
                WebBrowser.openBrowserAsync('https://omedom.com/legal/?simple=1');
                closeDrawer();
                break;

              case 2:
                linkTo('/mes-charges');
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
          {window.width > 780 && (
            <DrawerItem
              title="Mes Charges"
              accessoryLeft={ChargeIcon}
            />
          )}
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
            accessoryRight={() => {
              if (countNotification > 0) {
                return (
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: theme['color-danger-600'],
                  }}
                  >
                    <Text
                      category="c1"
                      appearance="alternative"
                      style={{
                        lineHeight: 20,
                        textAlign: 'center',
                      }}
                    >
                      {countNotification}
                    </Text>
                  </View>
                );
              }
              return (<></>);
            }}
          />
          {/** Waiting FAQ data
           <DrawerItem
           title="FAQ"
           accessoryLeft={QuestionIcon}
           />
 */}

          <DrawerItem
            title="Contact"
            accessoryLeft={EmailIcon}
          />
          <DrawerItem
            title="Légal"
            accessoryLeft={CadenaIcon}
          />
        </Drawer>
      </Layout>

      <TouchableOpacity
        onPress={() => {
          Auth.signOut();
        }}
        style={{
          paddingHorizontal: 26, marginBottom: 18 + inset.bottom,
        }}
      >
        <Text category="h5" style={{ textDecorationLine: 'underline' }}>Déconnexion</Text>
      </TouchableOpacity>

      <Text category="s1" appearance="hint" style={{ textAlign: 'center', marginBottom: 5 }}>
        v
        {Constants.manifest.version}
      </Text>
    </View>
  );
};

export default CustomDrawer;
