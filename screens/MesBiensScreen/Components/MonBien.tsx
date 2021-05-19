/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import {
  Layout, Text, Icon, useTheme,
} from '@ui-kitten/components';

import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { RealEstateItem } from '../../../src/API/RealEstate';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

type MonBienProps = { bien: RealEstateItem };

const MonBien = (props: MonBienProps) => {
  const { bien } = props;
  console.log('Mon Bien', bien);
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);
  const theme = useTheme();

  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };
  const allerMesRapports = () => {
    navigation.navigate('mes-rapports-biens1');
  };

  const onDetailsBiens = (id: string) => {
    linkTo(`/mes-biens/bien/${id}`);
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Layout style={{
        flexDirection: 'column',
        marginTop: 27,
        padding: 15,
        paddingBottom: 20,
        borderRadius: 10,
      }}
      >

        <TouchableOpacity onPress={() => setOpened(!opened)}>
          <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <CompteHeader title={bien.name} />
            <RotatingIcon name="arrow-ios-downward-outline" uikitten state={opened} width={24} height={25} fill="#b5b5b5" />
          </Layout>
        </TouchableOpacity>

        {!opened ? (
          <Layout style={{
            flexDirection: 'row',
            marginTop: 22,
            justifyContent: 'space-between',
          }}
          >
            {/**
              *
              */}
            <Layout>
              <Layout style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
              >
                <Layout style={{ width: 22, flexDirection: 'row' }}>
                  <Layout style={{ width: 7 }}>
                    <IconUIKitten
                      name="arrow-downward"
                      fill="#b5b5b5"
                      style={{ height: 16, width: 16 }}
                    />
                  </Layout>
                  <IconUIKitten
                    name="arrow-upward"
                    fill="#b5b5b5"
                    style={{
                      height: 16, width: 16, marginRight: 8,
                    }}
                  />
                </Layout>

                <Text category="h5" status="success">+ 10 800 €</Text>
              </Layout>
            </Layout>

            {/**
               *
               */}

            <Layout style={{
              alignItems: 'center',
              marginRight: 20,
              flexDirection: 'row',
            }}
            >
              <Icon
                name="arrow-downward"
                fill="#b5b5b5"
                style={{ height: 16, width: 16 }}
              />
              <Text category="h4" status="danger">- 160 €</Text>
            </Layout>

            {/**
               *
               */}
            <View style={{
              flexDirection: 'row',
            }}
            >
              <Icon
                name="trending-up"
                fill="#b5b5b5"
                style={{ height: 18, width: 18, marginRight: 2 }}
              />
              <Text category="h4" status="warning">60 %</Text>
            </View>

          </Layout>
        ) : (
          <Layout style={{ backgroundColor: 'transparent' }}>
            <Layout style={{
              borderBottomWidth: 1, marginVertical: 20, borderBottomColor: theme['text-hint-color'],
            }}
            />
            <Layout style={{
              flexDirection: 'row',
            }}
            >
              <Layout style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
                <Text category="h4" status="success" style={{ marginVertical: 14 }}>+ 500 €</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text category="h6" status="info">Affecter</Text>
                </TouchableOpacity>
              </Layout>

              <Layout style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>
                  Prochaine dépense
                </Text>
                <Text category="h4" status="danger">- 160 €</Text>
                <TouchableOpacity onPress={allerTresorerie}>
                  <Text category="h6" status="info">En savoir +</Text>
                </TouchableOpacity>
              </Layout>

              <Layout style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>
                  Réntabilité du bien
                </Text>
                <Text category="h4" status="warning" style={{ marginVertical: 14 }}>60 %</Text>
                <TouchableOpacity onPress={allerMesRapports}>
                  <Text category="h6" status="info">Mes rapports</Text>
                </TouchableOpacity>
              </Layout>
            </Layout>

            <TouchableOpacity onPress={() => onDetailsBiens(bien.id)} style={styles.button}>
              <Text category="h6" status="basic">Accéder au bien</Text>
              <Icon
                name="chevron-right-outline"
                fill="#b5b5b5"
                style={{ height: 18, width: 18, marginRight: 8 }}
              />
            </TouchableOpacity>
            <Graphics data={mesBiensData} />
            <GraphicsII />
          </Layout>
        )}
      </Layout>
    </MaxWidthContainer>
  );
};

export default MonBien;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,
    paddingHorizontal: 26,
  },
  containerBiens: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,
    paddingHorizontal: 23,
  },

  // Part I
  oneThirdBlock: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: 94,
    justifyContent: 'center',
    textAlign: 'center',
  },

  // Button ignorer les mouvements
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
});
