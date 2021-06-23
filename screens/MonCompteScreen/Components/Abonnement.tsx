import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import Card from '../../../components/Card';

/**
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
 */

const AbonnementComp = () => {
  const navigation = useNavigation();
  // console.log('info props', clientData.Client.fields[0]);
  // console.log('AdresseType props', clientData.AdresseType);

  const onPress = () => {
    navigation.navigate('modifier-info-1');
  };

  useEffect(() => {
    console.log('useEffect test of Abonnement component');
  });

  // eslint-disable-next-line implicit-arrow-linebreak
  return (

    <MaxWidthContainer outerViewProps={{
      style: {
        flex: 1, paddingTop: 32, paddingHorizontal: 28, marginVertical: 13,
      },
    }}
    >
      <Text
        category="h2"
        style={{ marginBottom: 20 }}
      >
        Abonnement
      </Text>

      {/* use SectionList to render several accounts with its types and details */}
      <Card style={styles.compteSection}>

        <View style={{
          flex: 1, borderRightWidth: 0.5, borderRightColor: '#b5b5b5',
        }}
        >
          <Text category="h5">Formule 3 a 5 biens</Text>
          <Text category="p1" style={{ marginTop: 3 }}>
            Mensuelle
          </Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Text category="h5" style={{ marginLeft: 31 }}>4.90 €TTC/Mois</Text>
        </View>

      </Card>

      <TouchableOpacity onPress={onPress}>
        <Text category="h5" status="info" style={styles.buttonTextLeft}>Changer de mode de paimenent</Text>
      </TouchableOpacity>

    </MaxWidthContainer>

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
    marginVertical: 19.5,
    backgroundColor: 'transparent',
    paddingBottom: 18,
  },
});

export default AbonnementComp;
