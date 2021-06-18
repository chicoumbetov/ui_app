import React, { useEffect, useState } from 'react';
import { Text, useTheme } from '@ui-kitten/components';

import { View } from 'react-native';
import { VictoryLabel, VictoryPie } from 'victory-native';

import { useRoute } from '@react-navigation/native';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
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
  // console.log('route dans MesCharges 3', route.params);

  /** 11111111 */
  const { range, title } = route.params;
  // console.log('dans ', range);

  /** 22222222222 */
  const biensDetails = useRealEstateList();

  /** 33333333333 */
  const fullSortExpense = biensDetails.data?.listRealEstates?.items?.map(
    (item) => (item && {
      ...item,
      totalValue: item?.budgetLineDeadlines?.items?.filter((x) => (x && x?.category === title
        // eslint-disable-next-line no-underscore-dangle
        && !x._deleted
        && DateUtils.parseToDateObj(x.date) >= range.startDate
        && DateUtils.parseToDateObj(x.date) <= range.endDate))
        .reduce((t, x) => t + (x ? x.amount : 0), 0),
    }),
  );

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, percentage: number, label: string }
  } = {};

  /** 66666666 */
  if (fullSortExpense) {
    fullSortExpense.forEach((item) => {
      // console.log('maison', item);
      if (item) {
        allCurrentCategories[item.name] = {
          value: item.totalValue || 0,
          percentage: 0,
          label: item.name,
        };
      }
    });
  }

  /** 4444444 */
  const totalExpenses = Object.values(allCurrentCategories)
    .reduce((t, { value }) => t + value, 0);
  // console.log('totalExpenses', totalExpenses);

  /** 55555 */
  // percentages
  Object.keys(allCurrentCategories).forEach((property) => {
    /** Get only percentage variable number that is coefficient from allCurrentCategories and
     * convert to actual percentage according on total value */
    allCurrentCategories[property].percentage = Math
      .round((allCurrentCategories[property].value / totalExpenses) * 100);
  });

  // console.log('fullSortExpense', fullSortExpense);
  // console.log('allCurrentCategories', allCurrentCategories);

  /** 777777777 999999 */
  const [victorydata, setVictoryData] = useState(Object.entries(allCurrentCategories).map(
    (item, index) => (
      { x: 0, y: index === 0 ? 100 : 0, i: item[1].label }),
  ));
  // console.log('victorydata :', victorydata);

  /** 8888888 */
  useEffect(() => {
    const victory = Object.entries(allCurrentCategories).map(
      (item) => ({ x: item[1].value, y: item[1].percentage, i: item[1].label }),
    );
    setVictoryData(victory); // Setting the data that we want to display
  }, []);

  // const [mesCharges] = useState(comptesData);

  const colorscale = [
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
    <MaxWidthContainer
      outerViewProps={{
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
        paddingHorizontal: 80,
        marginVertical: 12,
        paddingVertical: 40,
      }}
      >
        <VictoryPie
          padAngle={4}
          startAngle={-27}
          endAngle={333}
          cornerRadius={30}
          height={272}
          width={320}
          innerRadius={67}
          data={victorydata}
          animate={{ easing: 'exp' }}
          labels={(datum) => [`${Math.round(datum.datum.y)} %`, `${Math.round(datum.datum.x)} €`]}
          labelComponent={(
            <VictoryLabel
              style={[
                { fill: 'black', fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold' },
                { fill: '#b5b5b5', fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold' },
              ]}
            />
          )}
          colorScale={colorscale}
        />
        <View style={{ borderBottomWidth: 1, marginRight: 40, borderBottomColor: '#f5f5f5' }} />

        {victorydata.map((item, index) => (item.i !== ''
            && (
            <View
              key={item.i}
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: colorscale[index],
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  marginRight: 10,
                }}
              />
              <CompteHeader title={item.i} />
            </View>
            )
        ))}
      </View>
    </MaxWidthContainer>

  );
};

export default MesCharges3;
