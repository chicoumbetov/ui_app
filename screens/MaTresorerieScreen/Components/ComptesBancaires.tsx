import React, { useState } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import OwnerCompte from './OwnerCompte';
import CompteFooter from '../../../components/CompteFooter';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const ComptesBancaires = ({ client }) => {
  const [compte, setCompte] = useState(client);

  // eslint-disable-next-line implicit-arrow-linebreak
  return (
    <MaxWidthContainer>
      <Layout style={styles.container}>

        {/* use SectionList to render several accounts with its types and details */}
        <Text category="h2" style={styles.compteHeader}>
          Comptes Bancaires
        </Text>

        <SectionList
        /* sections data must be array */
          sections={compte}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Layout style={{ backgroundColor: 'transparent', marginTop: 25, marginLeft: 7 }}>
              <CompteHeader title={title} />
            </Layout>
          )}
          renderItem={({ item }) => (
            <Layout style={{ backgroundColor: 'transparent' }}>
              <OwnerCompte compte={item} />
            </Layout>
          )}
          renderSectionFooter={() => (
            <Layout style={styles.footer}>
              <CompteFooter />
            </Layout>
          )}
        />

      </Layout>
    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    paddingTop: 17,
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  compteHeader: {
    paddingTop: 3,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  footer: {
    paddingTop: 5,
    backgroundColor: 'transparent',
    paddingBottom: 32,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b5b5b5',
  },
});

export default ComptesBancaires;
