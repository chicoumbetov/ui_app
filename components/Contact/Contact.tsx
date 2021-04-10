import React from 'react';
import { SafeAreaView, SectionList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { AntDesign } from '@expo/vector-icons';
import faqQandA from '../../mockData/faqQandA';

const Contact = () => (
  <SafeAreaView style={styles.container}>
    <Layout style={styles.contact}>
      <Text style={styles.contactText}>Contact</Text>
    </Layout>
    <SectionList
      sections={faqQandA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <Layout style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </Layout>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Layout style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <AntDesign name="down" color="white" size={20} />
        </Layout>

      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  contact: {
    marginBottom: 20,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  contactText: {
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

export default Contact;
