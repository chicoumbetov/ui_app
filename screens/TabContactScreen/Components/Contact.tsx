import React, { useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  SectionList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import contactDATA from '../../../mockData/contactDATA';

const Contact = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState(contactDATA);

  const onMotif = () => {
    navigation.navigate('Contact2');
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
    <Layout style={styles.containerOut}>

      <Layout style={styles.container}>
        <Text style={styles.title}>Contact</Text>
        <SectionList
          sections={questions}
          initialNumToRender={1}
          keyExtractor={(item, index) => item.id + index + item.isChecked}
          renderItem={({ item, section: { index, isChecked } }) => (

            <View style={styles.item} key={index}>
              {isChecked
                    && (
                    <TouchableOpacity onPress={onMotif}>
                      <Text
                        key={index}
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
              title, id, index, isChecked,
            },
          }) =>
          // console.log('isChecked', isChecked);
          // eslint-disable-next-line implicit-arrow-linebreak
            (
              <View style={isChecked ? (styles.headerUp) : (styles.headerDown)}>
                <Text style={styles.headerText} key={id}>
                  {title}
                </Text>
                <TouchableOpacity onPress={() => pressHandler(id)} key={index + isChecked}>
                  {
                            isChecked
                              ? <AntDesign name="up" color="white" size={13} />
                              : <AntDesign name="down" color="white" size={13} />
                          }
                </TouchableOpacity>

              </View>
            )}
        />

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
