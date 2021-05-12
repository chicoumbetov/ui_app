import React, { useState } from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { FlatList, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

import { useRoute } from '@react-navigation/native';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../mockData/comptesData';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const data = [
  { x: '45%', y: 49 },
  { x: '55%', y: 54 },
];

const MesCharges3 = () => {
  const theme = useTheme();
  const route = useRoute();
  console.log('route dans MesCharges 3', route.params);

  const [mesCharges] = useState(comptesData);

  // const navigation = useNavigation();
  // const onMesCharges1 = () => { navigation.navigate('MesCharges1'); };

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        paddingVertical: 24,
        paddingHorizontal: 21,
        backgroundColor: '#f6f6f6',
      },
    }}
    >
      <Text
        category="h1"
        style={{
          marginTop: 13,
          marginBottom: 27,
        }}
      >
        Charge
        {' '}
        {route.params.title}
      </Text>
      <Layout style={{
        backgroundColor: theme['color-basic-100'],
        paddingLeft: 41,
        marginVertical: 12,
        paddingTop: 30,
        paddingBottom: 20,
      }}
      >
        <VictoryPie
          padAngle={4}
          startAngle={-27}
          endAngle={333}
          cornerRadius={30}
          height={272}
          width={272}
          innerRadius={67}
          data={data}
          colorScale={[theme['color-success-400'], theme['color-info-500'], theme['color-warning-500'], theme['color-danger-500']]}
        />
        <Layout style={{ borderBottomWidth: 1, marginRight: 40, borderBottomColor: theme['text-hint-color'] }} />
        <FlatList
          data={mesCharges}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <Layout style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Layout style={[
                styles.circles,
                { backgroundColor: theme['color-info-500'] },
              ]}
              />
              <CompteHeader title={item.item.title} />
            </Layout>
          )}
        />

      </Layout>
    </MaxWidthContainer>

  );
};

export default MesCharges3;

const styles = StyleSheet.create({
  circles: {
    marginTop: 10,
    height: 20,
    width: 20,
    borderRadius: 30,
    marginRight: 20,
  },
});
