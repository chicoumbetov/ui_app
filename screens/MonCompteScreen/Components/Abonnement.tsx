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

const Informations = (props: DataProps) => {
  const { clientData } = props;
  const navigation = useNavigation();
  // console.log('info props', clientData.Client.fields[0]);
  // console.log('AdresseType props', clientData.AdresseType);

  const onPress = () => {
    navigation.navigate('ModifierInfo1');
  };
  // eslint-disable-next-line implicit-arrow-linebreak
  return (

    <Layout style={{
      flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)', paddingTop: 32, paddingHorizontal: 28, marginVertical: 13,
    }}
    >
      <Text style={{
        fontSize: 21, fontWeight: '200', marginBottom: 20,
      }}
      >
        Abonnement
      </Text>

      {/* use SectionList to render several accounts with its types and details */}
      <Layout style={styles.compteSection}>

        <Layout style={{
          flex: 1, backgroundColor: 'transparent', borderRightWidth: 0.5, borderRightColor: '#b5b5b5',
        }}
        >
          <Text style={{ fontSize: 17 }}>Formule 3 a 5 biens</Text>
          <Text style={{
            color: '#b5b5b5', fontSize: 14.5, marginTop: 3,
          }}
          >
            Mensuelle
          </Text>
        </Layout>

        <Layout style={{
          flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Text style={{ fontSize: 17.6, marginLeft: 31 }}>4.90 €TTC/Mois</Text>
        </Layout>

      </Layout>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTextLeft}>Changer de mode de paimenent</Text>
      </TouchableOpacity>

    </Layout>

  );
};

const styles = StyleSheet.create({

  compteSection: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonTextLeft: {
    color: '#0076c8',
    fontSize: 16.5,
    letterSpacing: 0.15,
    marginVertical: 19.5,
    marginLeft: 0,
    fontWeight: '600',
    backgroundColor: 'transparent',
    paddingBottom: 18,
  },
});

export default Informations;
