import React, { useState } from 'react';
import { Text, useTheme } from '@ui-kitten/components';

import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';

import { useRoute } from '@react-navigation/native';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../mockData/comptesData';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';
import DateUtils from '../../../utils/DateUtils';

/**
const data = [
  { x: '45%', y: 49 },
  { x: '55%', y: 54 },
];
 */

const MesCharges3 = () => {
  const theme = useTheme();
  const route = useRoute();
  console.log('route dans MesCharges 3', route.params);

  const { range, title } = route.params;
  console.log('dans ', range);

  /** Sort by houses and their expenses */
  const biensDetails = useRealEstateList();

  const fullSortExpense = biensDetails.data?.listRealEstates?.items?.map(
    (item) => item?.budgetLineDeadlines?.items,
  );
  console.log('Tout depènse de tout les maisons', fullSortExpense);

  const total = [];

  fullSortExpense?.map((itemExpense) => {
    itemExpense.map((x) => {
      if (x?.category === title
          // eslint-disable-next-line no-underscore-dangle
          && !x._deleted
          && DateUtils.parseToDateObj(x.date) >= range.startDate
          && DateUtils.parseToDateObj(x.date) <= range.endDate
      ) {
        total.push(x);
      }
    });
  });
  console.log('Trié par les maison ET leurs expenses', total);

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, percentage: number, label: string }
  } = {};

  total && total.forEach((item) => {
    console.log('maison', item);
    const name = biensDetails.data?.listRealEstates?.items?.filter((bien) => bien.id === item.realEstateId)[0]?.name;
    if (allCurrentCategories[name] === undefined) {
      /**
       * initial values and then calculate percentage starting from 0
       */
      allCurrentCategories[name] = {
        value: item?.amount || 0,
        percentage: 0,
        label: item?.category,
      };
    } else {
      /** else If any expoense exist then we add to allCurrentCategories variable */
      allCurrentCategories[name].value += item?.amount || 0;
    }
  });

  const totalExpenses = Object.values(allCurrentCategories).reduce((t, { value }) => t + value, 0);

  // percentages
  Object.keys(allCurrentCategories).forEach((property) => {
    /** Get only percentage variable number that is coefficient from allCurrentCategories and
     * convert to actual percentage according on total value */
    allCurrentCategories[property].percentage = Math
      .round((allCurrentCategories[property].value / totalExpenses) * 100);
  });

  console.log('allCurrentCategories', Object.keys(allCurrentCategories));
  const houseName = Object.keys(allCurrentCategories);

  const [victoryData] = useState(Object.values(allCurrentCategories));
  console.log('data :', victoryData);

  const victory = victoryData.map(
    (val) => (
      { x: val.value, y: val.percentage, i: val.label }),
  );

  console.log('victory', victory);

  const [mesCharges] = useState(comptesData);

  // const navigation = useNavigation();
  // const onMesCharges1 = () => { navigation.navigate('MesCharges1'); };

  const colorScale = [
    theme['color-success-400'],
    theme['color-warning-500'],
    theme['color-info-500'],
    theme['color-danger-500'],
    theme['color-success-200'],
    theme['color-warning-700'],
    theme['color-info-200'],
    theme['color-danger-700'],
    theme['color-success-800'],
    theme['color-warning-300'],
    theme['color-info-200'],
    theme['color-danger-200'],
  ];

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        paddingVertical: 24,
        paddingHorizontal: 21,
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
        {`Charge ${title || ''}`}
      </Text>
      <View style={{
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
          data={victory}
          labels={(datum) => `${datum.datum.y} %`}
          colorScale={colorScale}
        />
        <View style={{ borderBottomWidth: 1, marginRight: 40, borderBottomColor: '#f5f5f5' }} />

        {houseName.map((g, index) => (
          <>
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}
            >
              <View style={[
                styles.circles,
                { backgroundColor: theme['color-info-500'] },
              ]}
              />
              <View
                style={{
                  backgroundColor: colorScale[g.indexOf(g)],
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  marginRight: 10,
                }}
              />
              <CompteHeader title={g} />
            </View>
          </>
        ))}

        {/**
         <View style={{ borderBottomWidth: 1, marginRight: 40, borderBottomColor: '#f5f5f5' }} />
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
        */}

      </View>
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
