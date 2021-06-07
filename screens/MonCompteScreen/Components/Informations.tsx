import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { UserItem } from '../../../src/API/UserContext';

type InformationProps = {
  utilisateur?: UserItem | null
};

const Informations = ({ utilisateur } : InformationProps) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('modifier-info-1');
  };
  // eslint-disable-next-line implicit-arrow-linebreak
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          flex: 1, backgroundColor: '#f6f6f6', paddingTop: 32, paddingHorizontal: 22, marginTop: 11,
        },
        showsVerticalScrollIndicator: false,
      }}
    >
      <Text
        category="h2"
        style={{
          marginBottom: 36,
        }}
      >
        Informations
      </Text>
      <Layout style={styles.compteSection}>
        {/* use SectionList to render several accounts with its types and details */}
        <Text category="h6" status="basic">Date de naissance</Text>
        <Text appearance="hint" style={{ marginTop: 6 }}>{utilisateur?.privateProfile?.birthDate || undefined}</Text>
        <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" status="basic" style={{ marginTop: 7 }}>Adresse e-mail : </Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>
          {utilisateur?.privateProfile?.email || undefined}
        </Text>
        <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" status="basic" style={{ marginTop: 8 }}>Ville</Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>{utilisateur?.privateProfile?.address?.city || undefined}</Text>
        <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" status="basic" style={{ marginTop: 10 }}>Numéro de téléphone</Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>{utilisateur?.privateProfile?.phoneNumber || undefined}</Text>
      </Layout>
      <TouchableOpacity onPress={onPress}>
        <Text category="h5" status="info" style={styles.buttonTextLeft}>Modifier les informations</Text>
      </TouchableOpacity>
    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  compteSection: {
    paddingVertical: 24,
    paddingHorizontal: 26.5,
    borderRadius: 10,
  },
  buttonTextLeft: {
    marginVertical: 18,
    paddingBottom: 18,
  },
});

export default Informations;
