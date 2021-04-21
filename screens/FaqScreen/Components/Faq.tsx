import React, { useState } from 'react';
import {
  SafeAreaView, SectionList, StyleSheet, Text, View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const Faq = ({ faqQandAs }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.faq}>FAQ</Text>
      </View>
      <SectionList
        sections={faqQandAs}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <AntDesign name="down" color="white" size={20} />
          </View>

        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  faq: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    padding: 20,
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
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Faq;
