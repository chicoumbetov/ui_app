import React, { useState } from 'react';
import {
  SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

const ajoutBienScreen = () => (

  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.faq}>Création de votre bien</Text>
    </View>

    <View style={styles.item}>

      <Text style={{
        fontSize: 11, paddingHorizontal: 20, paddingTop: 9, height: 199, lineHeight: 23.8,
      }}
      >
        Identité (1/3)
      </Text>

    </View>

  </SafeAreaView>
);

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

export default ajoutBienScreen;
