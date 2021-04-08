import React from 'react';
import { Image, SectionList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import OwnerCompte from './OwnerCompte/OwnerCompte';
import CompteFooter from '../CompteFooter';
import comptesData from '../../mockData/comptesData';

const ComptesBancaires = () =>
// query
// const comptes = query

// eslint-disable-next-line implicit-arrow-linebreak
  (
    <Layout style={styles.container}>

      {/* use SectionList to render several accounts with its types and details */}
      <Layout style={styles.compteSection}>
        <Text style={styles.compteHeader}>
          Comptes Bancaires
        </Text>
        <SectionList
                    /* sections data must be array */
          sections={comptesData}
          renderSectionHeader={({ section: { title } }) => (
            <Layout>
              <Layout style={{
                marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
              }}
              >
                <Image
                  source={require('../../assets/images/img.png')}
                  style={{ height: 40, width: 40, marginRight: 12 }}
                />
                <Text style={{ fontSize: 20, fontWeight: '500' }}>
                  {' '}
                  La maison de
                  {' '}
                  {title}
                </Text>
              </Layout>
            </Layout>
          )}
          renderItem={({ item }) => <OwnerCompte compte={item} />}
          renderSectionFooter={() => (
            <Layout style={styles.footer}>
              <CompteFooter />
            </Layout>

          )}
          keyExtractor={(item) => item.id}
        />
      </Layout>

    </Layout>

  );

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  compteSection: {
    paddingTop: 10,
  },
  compteHeader: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '400',
  },
  footer: {
    paddingBottom: 29,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b5b5b5',
  },
});

export default ComptesBancaires;
