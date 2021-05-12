import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import TextInputComp from '../../../components/Form/TextInput';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

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
    <MaxWidthContainer outerViewProps={{
      style: { backgroundColor: '#efefef' },
    }}
    >

      <Layout style={styles.containerOut}>

        <Text category="h1" style={styles.title}>Générer une quittance de loyer</Text>
        <Form <QuittanceLoyerForm> {...quittanceLoyerForm}>

          <SelectComp name="bien" data={comptesData} placeholder="Choisissez le bien" size="large" appearance="default" status="primary" />

          <TextInputComp label="Année de l'écheance" placeholder="jj/mm/aaaa" icon="calendar-outline" />

        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onQuittanceLoyer2} size="large" style={{ width: 139 }}>
            Confirmer
          </Button>
        </View>

      </Layout>
    </MaxWidthContainer>
  );
};

export default QuittanceLoyer;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
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
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
});
