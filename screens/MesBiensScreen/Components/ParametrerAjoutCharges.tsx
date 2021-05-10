import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

const ParametrerAjoutCharges = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('useEffect of Parametrer Ajout Charges');
  }, []);

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      {/**
         *  I. Mon Budget
         */}
      <Layout style={styles.container}>
        <Text category="h1">
          Mon Budget
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <MaisonVert height={40} width={40} style={{ marginRight: 12 }} />
          <Text category="h3">
            {' '}
            {/* {compte.typeBien} */}
            La Maison
            {' '}
            de Mathieu
            {' '}
          </Text>
        </View>
      </Layout>

      {/**
       *  II. Ajouter charges
       */}
      <Layout style={styles.container}>
        <Text category="h2">
          Ajouter une charge
        </Text>
      </Layout>
    </MaxWidthContainer>
  );
};

export default ParametrerAjoutCharges;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
});
