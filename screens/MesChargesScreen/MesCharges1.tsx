import React, { useState } from 'react';
import { Text, useTheme } from '@ui-kitten/components';

import {
  TouchableOpacity,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';

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
  const [charges] = useState(DATA);

  const onMesCharges2 = (item) => {
    navigation.navigate('MesCharges2', { title: item.title });
  };

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

      {charges.map(
        (item) => (
          <Card
            key={item.id}
            style={{
              padding: 23,
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => { onMesCharges2(item); }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
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
          </Card>
        ),
      )}
    </MaxWidthContainer>

  );
};

export default MesCharges1;

// const styles = StyleSheet.create({ container: {} });
