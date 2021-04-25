import React, { useState } from 'react';
import {
  Image,
  SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import notificationsDATA from '../../../mockData/notificationsDATA';

const Notifications = () => {
  const [questions, setQuestions] = useState(notificationsDATA);

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
        // ensuite on change boolean de isChecked dans le faqDATA
        return { ...question, isChecked: !question.isChecked };
      }
      return question;
    });
    // here we change the boolean of chosen button => isChecked state
    setQuestions(temp);
    // console.log(questions[id].isChecked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.faq}>Notifications</Text>
      </View>
      <SectionList
        sections={questions}
        keyExtractor={(item, index) => item.id + index + item.isChecked}
        renderItem={({ item, section: { index, isChecked } }) => (

          <View style={styles.item} key={index}>
            {isChecked
                  && (
                  <Text style={{
                    fontSize: 11,
                    paddingHorizontal: 20,
                    paddingTop: 9,
                    height: 199,
                    lineHeight: 23.8,
                  }}
                  >
                    {item}
                  </Text>
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
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{
                  height: 40, width: 40, borderRadius: 40, backgroundColor: 'white',
                }}
              />
              <Text style={styles.headerText} key={index}>
                {title}
              </Text>
              <TouchableOpacity onPress={() => pressHandler(id)} key={index + isChecked}>
                {
                          isChecked
                            ? <AntDesign name="up" color="white" size={13} />
                            : <AntDesign name="right" color="white" size={13} />
                        }
              </TouchableOpacity>

            </View>
          )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  faq: {
    marginTop: 12,
    marginBottom: 49,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'HouschkaRoundedMedium',
    letterSpacing: 0,
    color: '#000000',
  },
  item: {

  },
  headerDown: {
    padding: 22,
    marginBottom: 36,
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
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerUp: {
    padding: 22,
    marginBottom: 15,
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
  headerText: {
    fontSize: 16,
    color: '#fff',
    width: 220,
  },
  title: {
    fontSize: 24,
  },
});

export default Notifications;
