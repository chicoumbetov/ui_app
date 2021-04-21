import React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import OwnerCompte from './OwnerCompte';
import CompteFooter from '../../../components/CompteFooter';
import comptesData from '../../../mockData/comptesData';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

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
            <CompteHeader title={title} />
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
    marginTop: 20,
    borderRadius: 10,
  },
  compteSection: {
    paddingTop: 10,
    padding: 20,
    borderRadius: 10,
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
