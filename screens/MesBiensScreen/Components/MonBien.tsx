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
  StyleSheet, TouchableOpacity,
} from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';
import { colors } from '../../../assets/styles';
import comptesData from '../../../mockData/comptesData';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

function MonBien() {
  const linkTo = useLinkTo();
  const [opened, setOpened] = useState(false);
  const theme = useTheme();

  const onDetailsBiens = () => {
    const id = '10';
    linkTo(`/mes-biens/bien/${id}`);
  };

  return (
    <MaxWidthContainer>
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
            <CompteHeader title={comptesData[0].title} />
            <RotatingIcon name="arrow-ios-upward-outline" uikitten state={opened} width={24} height={25} fill="#b5b5b5" />
          </Layout>
        </TouchableOpacity>

        {!opened ? (
          <>
            <Layout style={{
              flexDirection: 'row',
              marginTop: 8,
              marginBottom: 5,
              justifyContent: 'space-between',
            }}
            >
              {/**
              *
              */}
              <Layout style={{
                flex: 2,
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 14,
                marginRight: 8,
              }}
              >
                <Icon
                  name="arrow-downward"
                  fill="#b5b5b5"
                  style={{ height: 16, width: 16 }}
                />
                <Icon
                  name="arrow-upward"
                  fill="#b5b5b5"
                  style={{
                    height: 16, width: 16, marginRight: 8,
                  }}
                />

                <Text category="h5" status="success">+ 10 800 €</Text>
              </Layout>

              {/**
               *
               */}
              <Layout style={{
                flex: 1,
                alignItems: 'center',
                marginRight: 8,
                flexDirection: 'row',
                marginTop: 13,
              }}
              >
                <Icon
                  name="arrow-downward"
                  fill="#b5b5b5"
                  style={{ height: 16, width: 16, marginRight: 8 }}
                />
                <Text category="h4" status="danger">- 160 €</Text>
              </Layout>

              {/**
               *
               */}
              <Layout style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 14,
                flexDirection: 'row',
              }}
              >
                <Icon
                  name="trending-up"
                  fill="#b5b5b5"
                  style={{ height: 18, width: 18, marginRight: 8 }}
                />
                <Text category="h4" status="warning">60 %</Text>
              </Layout>

            </Layout>
          </>
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
                <TouchableOpacity onPress={() => {}}>
                  <Text category="h6" status="info">En savoir +</Text>
                </TouchableOpacity>
              </Layout>

              <Layout style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>
                  Réntabilité du bien
                </Text>
                <Text category="h4" status="warning" style={{ marginVertical: 14 }}>60 %</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text category="h6" status="info">Mes rapports</Text>
                </TouchableOpacity>
              </Layout>
            </Layout>

            <TouchableOpacity onPress={onDetailsBiens} style={styles.button}>
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
}

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
