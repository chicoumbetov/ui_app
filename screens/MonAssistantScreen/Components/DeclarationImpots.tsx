import React from 'react';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import TextInputComp from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';

type DeclarationImpotsForm = {
  bien: string;
  anneeEcheance: string;
};

const DeclarationImpots = () => {
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

  const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const onDeclarationImpots2 = () => {
    navigation.navigate('DeclarationImpots2');
  };

  return (
    <ScrollView>

      <Layout style={styles.containerOut}>

        <Text category="h1" style={styles.title}>Paramétrer mon aide à la déclaration d'impôts</Text>

        <Form <DeclarationImpotsForm> {...declarationImpotsForm}>

          <SelectComp name="bien" data={comptesData} placeholder="Choisissez le bien" size="large" appearance="default" status="primary" />

          <TextInputComp label="Année de l'écheance" placeholder="aaaa" icon="calendar-outline" />

        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onDeclarationImpots2} size="large" style={{ width: 139 }}>
            Confirmer
          </Button>
        </View>

      </Layout>

    </ScrollView>
  );
};

export default DeclarationImpots;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 25,
    paddingRight: 21,
  },
  title: {
    marginTop: 19.7,
    marginBottom: 14,
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
  inputStyle: {
    borderRadius: 7,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginBottom: 32,
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
