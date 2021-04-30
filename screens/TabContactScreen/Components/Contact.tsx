import React, { useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import {
  SectionList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import contactDATA from '../../../mockData/contactDATA';
import TextInput from '../../../components/Form/TextInput';
import { colors } from '../../../assets/styles';

enum MotifState {
  hideMotif,
  showMotif,
}

const Contact = () => {
  const [questions, setQuestions] = useState(contactDATA);
  const [motifContact, setMotifContact] = useState(false);

  const showMotifContact = (id: number) => {
    switch (id) {
      case MotifState.showMotif:
        setMotifContact(true);
        break;
      case MotifState.hideMotif:
        setMotifContact(false);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={styles.containerOut}>

      <Layout style={styles.container}>
        <Text style={styles.title}>Contact</Text>
        <SectionList
          sections={questions}
          initialNumToRender={1}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (

            <View style={styles.item}>
              {motifContact
                    && (
                    <TouchableOpacity onPress={() => {}}>
                      <Text
                        style={{
                          fontSize: 16,
                          letterSpacing: 0.07,
                          fontFamily: 'HouschkaRoundedDemiBold',
                          backgroundColor: 'white',

                          paddingHorizontal: 24,
                          paddingVertical: 26,
                        }}
                      >
                        {item.motif}
                      </Text>
                    </TouchableOpacity>
                    )}
            </View>
          )}
          renderSectionHeader={({
            section: {
              title, id,
            },
          }) =>
          // console.log('isChecked', isChecked);
          // eslint-disable-next-line implicit-arrow-linebreak
            (
              <Layout style={motifContact ? (styles.headerUp) : (styles.headerDown)}>
                <Text style={styles.headerText} key={id}>
                  {title}
                </Text>

                <TouchableOpacity onPress={() => {}}>
                  {
                  motifContact
                    ? <AntDesign name="up" color="white" size={13} />
                    : <AntDesign name="down" color="white" size={13} />
                  }
                </TouchableOpacity>

              </Layout>
            )}
        />
        <TextInput
          name="Votre Message"
          label="Votre Message"
          placeholderTextColor={colors.gris}
          placeholder="Saisissez votre texte ici"
          style={styles.inputStyle}
        />
        <Layout style={{ alignItems: 'flex-end', backgroundColor: 'transparent' }}>
          <Button
            onPress={() => {}}
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
