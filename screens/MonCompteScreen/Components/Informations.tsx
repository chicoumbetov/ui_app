import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

type DataProps = {
  clientData: {
    Client: ClientProps,
    AdresseType: AdresseProps,
  }
};

type ClientProps = {
  id: string,
  fields: [{
    id: string,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    dateDeNaissance: string,
  }, {
    id: string,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    dateDeNaissance: string,
  }]
};

type AdresseProps = {
  id: string,
  fields: [{
    id: string,
    adresse: string,
    complementAdresse: string,
    codePostal: string,
    ville: string,
    pays: string,
  }, {
    id: string,
    adresse: string,
    complementAdresse: string,
    codePostal: string,
    ville: string,
    pays: string,
  }]
};

const Informations = ({ clientData }: DataProps) => {
  // console.log('info props', clientData.Client.fields[0]);
  // console.log('AdresseType props', clientData.AdresseType);
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ModifierInfo1');
  };
  // eslint-disable-next-line implicit-arrow-linebreak
  return (

    <Layout style={{
      flex: 1, backgroundColor: '#f6f6f6', paddingTop: 32, paddingHorizontal: 22, marginTop: 11,
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
        <Text category="h6">Date de naissance</Text>
        <Text appearance="hint" style={{ marginTop: 6 }}>{clientData.Client.fields[0].dateDeNaissance}</Text>
        <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" style={{ marginTop: 7 }}>Adresse mail : </Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>
          {clientData.Client.fields[0].email}
        </Text>
        <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" style={{ marginTop: 8 }}>Ville</Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>{clientData.AdresseType.fields[0].ville}</Text>
        <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

        <Text category="h6" style={{ marginTop: 10 }}>Numéro de téléphone</Text>
        <Text appearance="hint" style={{ marginTop: 5 }}>{clientData.Client.fields[0].numeroTel}</Text>
      </Layout>
      <TouchableOpacity onPress={onPress}>
        <Text category="h5" status="info" style={styles.buttonTextLeft}>Modifier les informations</Text>
      </TouchableOpacity>
    </Layout>

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
