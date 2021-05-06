import React, { useState } from 'react';
import {
  SafeAreaView, SectionList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon, Text } from '@ui-kitten/components';
import faqDATA from '../../mockData/faqDATA';

const Faq = () => {
  const [questions, setQuestions] = useState(faqDATA);

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
        <Text category="h1" style={styles.header}>FAQ</Text>
      </View>
      <SectionList
        sections={questions}
        keyExtractor={(item, index) => item.id + index + item.isChecked}
        renderItem={({ item, section: { index, isChecked } }) => (

          <View style={styles.item} key={index}>
            {isChecked
            && (
            <Text category="H6">
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
              <Text category="h6" status="control" key={index}>
                {title}
              </Text>
              <TouchableOpacity onPress={() => pressHandler(id)} key={index + isChecked}>
                {
              isChecked
                ? <Icon name="arrow-ios-upward-outline" fill="#ffffff" style={{ height: 20, width: 20 }} />
                : <Icon name="arrow-ios-downward-outline" fill="#ffffff" style={{ height: 20, width: 20 }} />
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
  header: {
    marginTop: 12,
    marginBottom: 49,
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
    padding: 22,
    marginBottom: 15,
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
  headerText: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Faq;