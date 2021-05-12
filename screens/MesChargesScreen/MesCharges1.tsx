import React, { useEffect, useState } from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const DATA = [
  {
    id: '0',
    title: 'Eau',
    isChecked: false,
  },
  {
    id: '1',
    title: 'Electricité',
    isChecked: false,
  },
  {
    id: '2',
    title: 'Frais Divers',
    isChecked: false,
  },
  {
    id: '3',
    title: 'Assurances',
    isChecked: false,
  },
];

const MesCharges1 = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [charges, setCharges] = useState(DATA);

  const onMesCharges2 = (item) => {
    navigation.navigate('MesCharges2', { title: item.title });
  };

  useEffect(() => {
    console.log('useEffect test of MesCharges 1');
  });

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        padding: 24,
        backgroundColor: '#f6f6f6',
      },
    }}
    >
      <Text category="h1" status="basic" style={{ marginTop: 13 }}>Mes rapports par charges</Text>
      <Text
        category="h5"
        appearance="hint"
        style={{
          marginTop: 7,
          paddingVertical: 30,
        }}
      >
        Choisissez votre charge
      </Text>

      <FlatList
        data={charges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => { onMesCharges2(item); }}
            style={[
              styles.docs,
              { backgroundColor: theme['color-basic-100'] },
            ]}
          >
            <Text category="h5" status="basic">{item.title}</Text>

            <IconUIKitten
              name="arrow-ios-forward"
              fill={theme['text-hint-color']}
              style={{
                height: 17, width: 17,
              }}
            />

          </TouchableOpacity>
        )}
      />

    </MaxWidthContainer>

  );
};

export default MesCharges1;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 23,
    paddingVertical: 29.5,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 29,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
});
