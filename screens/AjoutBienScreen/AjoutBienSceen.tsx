import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { colors } from '../../assets/styles';

function AjoutBienScreen() {
  const [etape1, setEtape1] = useState(1);
  const [etape2, setEtape2] = useState(1);
  const [etape3, setEtape3] = useState(1);

  const SetEtape1 = () => {
    if (etape1 === 0) {
      setEtape1(1);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.blanc }}>
      <View>
        <Text style={styles.faq}>Création de votre bien</Text>
      </View>

      <View style={{ ...styles.item, backgroundColor: ((etape1 === 0) ? colors.orange4 : ((etape1 === 1) ? colors.blanc : colors.green)) }}>
        <TouchableOpacity
          onPress={() => SetEtape1()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              color: colors.noir,
              marginLeft: 27,
            }}

          >
            Identité (1/3)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: colors.blanc,
  },
  faq: {
    marginTop: 12,
    marginBottom: 49,
    marginLeft: 22,
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

export default AjoutBienScreen;
