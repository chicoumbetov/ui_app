import React, { useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import {
  SectionList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import contactDATA from '../../../mockData/contactDATA';
import TextInput from '../../../components/Form/TextInput';
import { colors } from '../../../assets/styles';
import SelectComp from '../../../components/Form/Select';

enum MotifState {
  hideMotif,
  showMotif,
}

const Contact = () => {
  const [questions, setQuestions] = useState(contactDATA);
  const [motifContact, setMotifContact] = useState(true);

  const pressHandler = (index) => {
    setMotifContact(!motifContact);
  };

  return (
    <Layout style={styles.containerOut}>

      <Layout style={styles.container}>
        <Text style={styles.title}>Contact</Text>

        <TextInput
          name="Votre Message"
          label="Votre Message"
          placeholderTextColor={colors.gris}
          placeholder="Saisissez votre texte ici"
          style={styles.inputStyle}
        />

        <SelectComp name="contact" data={contactDATA} placeholder="Motif Contact" size="large" appearance="default" status="primary" />
        <Layout style={{ alignItems: 'flex-end', backgroundColor: 'transparent' }}>
          <Button
            onPress={() => { co; }}
            style={{ ...styles.buttonRight }}
          >
            Envoyer
          </Button>
        </Layout>
      </Layout>

    </Layout>

  );
};

export default Contact;

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

  // Envoyer button
  buttonRight: {
    width: 150,
    backgroundColor:
  colors.green,
  },
});
