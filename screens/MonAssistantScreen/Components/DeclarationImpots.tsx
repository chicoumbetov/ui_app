import React from 'react';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import TextInputComp from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

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
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      <Layout style={styles.containerOut}>

        <Text
          category="h1"
          style={{
            marginTop: 19.7,
            marginBottom: 14,
          }}
        >
          Paramétrer mon aide à la déclaration d'impôts
        </Text>

        <Form <DeclarationImpotsForm> {...declarationImpotsForm}>
          <SelectComp
            name="bien"
            data={comptesData}
            placeholder="Choisissez le bien"
            size="large"
            appearance="default"
            status="primary"
          />
          <TextInputComp
            label="Année de l'écheance"
            name="anneeEcheance"
            placeholder="aaaa"
            icon="calendar-outline"
          />
        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onDeclarationImpots2} size="large" style={{ width: 139 }}>
            Confirmer
          </Button>
        </View>

      </Layout>

    </MaxWidthContainer>
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
  item: {
    borderBottomEndRadius: 20,
  },
  headerText: {
    marginTop: 2.8,
  },
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
});
