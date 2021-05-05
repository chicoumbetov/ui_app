import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { colors } from '../../../assets/styles';
import CompteHeader from '../../../components/CompteHeader';
import comptesData from '../../../mockData/comptesData';

const data = [
  { x: '45%', y: 49 },
  { x: '55%', y: 54 },
];

const MesCharges3 = () => {
  const navigation = useNavigation();

  const onMesCharges1 = () => {
    navigation.navigate('MesCharges1');
  };

  return (

    <Layout style={styles.container}>
      <Text style={styles.title}>Charge Eau</Text>
      <Layout style={{
        backgroundColor: colors.blanc, paddingLeft: 41, marginVertical: 12, paddingTop: 30, paddingBottom: 20,
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
          colorScale={[colors.green, colors.bleu, colors.jaune, colors.rouge]}
        />
        <Layout style={{ borderBottomWidth: 1, marginRight: 40, borderBottomColor: colors.gris }} />
        <FlatList
          data={comptesData}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Layout style={{ ...styles.circles, backgroundColor: colors.bleu }} />
              {/**
              *  Have to Pass text color and fontFamily
              */}
              <CompteHeader data={item} />
            </Layout>
          )}
        />

      </Layout>
    </Layout>

  );
};

export default MesCharges3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 21,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
    marginBottom: 27,
  },
  circles: {
    backgroundColor: colors.rouge,
    marginTop: 10,
    height: 20,
    width: 20,
    borderRadius: 30,
    marginRight: 20,
  },
});
