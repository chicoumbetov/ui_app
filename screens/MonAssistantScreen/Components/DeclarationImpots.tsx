import React, { useState } from 'react';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  SectionList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import assistantDATA from '../../../mockData/assistantDATA';
import TextInputComp from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import Icon from '../../../components/Icon';
import { colors } from '../../../assets/styles';

type DeclarationImpotsForm = {
  bien: string;
  anneeEcheance: string;
};

const DeclarationImpots = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState(assistantDATA);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
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

  const pressHandler = (id: number) => {
    // console to check which question was clicked
    // console.log(id);
    // if Clicked then show chosen index ( therefore setAccodion)
    const temp = questions.map((question) => {
      // comparison of clicked index with taken index
      if (id === question.id) {
        // console to check that correct id was taken when clicked
        // console.log(question.id);
        // on recupere question et on fait copie,
        // ensuite on change boolean de isChecked dans le assistantDATA
        return { ...question, isChecked: !question.isChecked };
      }
      return question;
    });
    // here we change the boolean of chosen button => isChecked state
    setQuestions(temp);
    // console.log(questions[id].isChecked);
  };

  return (
    <ScrollView>

      <Layout style={styles.containerOut}>

        <Layout style={styles.container}>

          <Text style={styles.title}>Paramétrer mon aide à la déclaration d'impôts</Text>

          <Form <DeclarationImpotsForm> {...declarationImpotsForm}>

            <SelectComp name="bien" data={comptesData} placeholder="Choisissez le bien" size="large" appearance="default" status="primary" />

            <TextInputComp label="Année de l'écheance" placeholder="aaaa" />

          </Form>

          <View style={styles.buttonRight}>
            <Button onPress={onDeclarationImpots2} style={{ width: 150 }}>
              Confirmer
            </Button>
          </View>

        </Layout>

      </Layout>

    </ScrollView>
  );
};

export default DeclarationImpots;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  container: {
    padding: 25,
    paddingRight: 21,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
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
