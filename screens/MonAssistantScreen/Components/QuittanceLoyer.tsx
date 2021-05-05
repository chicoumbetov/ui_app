import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import TextInputComp from '../../../components/Form/TextInput';

type QuittanceLoyerForm = {
  bien: string;
  anneeEcheance: string;
};

const QuittanceLoyer = () => {
  const navigation = useNavigation();

  const comptesData = [
    {
      label: 'La Maison de Matthieu',
      key: 'b1',
    },
    {
      label: 'L\'Appart de Matthieu',
      key: 'b2',
    },
  ];

  const quittanceLoyerForm = useForm<QuittanceLoyerForm>();

  const onQuittanceLoyer2 = () => {
    navigation.navigate('QuittanceLoyer2');
  };

  return (
    <Layout style={styles.containerOut}>

      <Layout style={styles.container}>
        <Text style={styles.title}>Générer une quittance de loyer</Text>
        <Form <QuittanceLoyerForm> {...quittanceLoyerForm}>

          <SelectComp name="bien" data={comptesData} placeholder="Choisissez le bien" size="large" appearance="default" status="primary" />

          <TextInputComp label="Année de l'écheance" placeholder="jj/mm/aaaa" icon="calendar-outline" />

        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onQuittanceLoyer2} style={{ width: 150 }}>
            Confirmer
          </Button>
        </View>

      </Layout>

    </Layout>

  );
};

export default QuittanceLoyer;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  container: {
    padding: 25,
    paddingRight: 21,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 25.7,
    marginTop: 19.7,
    marginBottom: 14,
    lineHeight: 27.4,
    letterSpacing: 0.1,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  item: {
    borderBottomEndRadius: 20,
  },
  headerText: {
    marginTop: 2.8,
    fontSize: 17,
    letterSpacing: 0.33,
    color: '#fff',
  },
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
  headerDown: {
    padding: 22,
    paddingRight: 23,
    marginTop: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#37a3de',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerUp: {
    padding: 28,
    paddingLeft: 27,
    paddingRight: 20.5,
    marginTop: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#5fc4ee',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
