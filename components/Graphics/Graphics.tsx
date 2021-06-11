import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

import { VictoryPie } from 'victory-native';

import MaxWidthContainer from '../MaxWidthContainer';

type MesBiensDataProps = {
  [key: string]: { value: number, percentage: number, label: string }
};

const Graphics = (data: MesBiensDataProps) => {
  const theme = useTheme();
  console.log('theme: ', theme);

  /** To avoid displayment of values equal to 0 */
  // .filter((y) => y > 0)
  const [victoryData] = useState(Object.values(data));
  console.log('data :', victoryData);

  const VICTORY_DATA = victoryData.map(
    (item) => (Object.values(item).map((val) => (
      { x: val.value, y: val.percentage, i: val.label }))),
  );
  console.log(VICTORY_DATA);

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
    <MaxWidthContainer>
      <View style={styles.container}>
        <View style={styles.compteSection}>

          <View style={{ alignItems: 'center', margin: 30 }}>
            <VictoryPie
              padAngle={4}
              startAngle={-27}
              endAngle={333}
              cornerRadius={30}
              height={272}
              width={272}
              innerRadius={67}
              data={VICTORY_DATA[0]}
              labels={(datum) => `${datum.datum.y} %`}
              colorScale={colorScale}
            />
          </View>

          <View style={{
            borderWidth: 0.5,
            borderColor: '#b5b5b5',
            marginVertical: 20,
          }}
          />

          {/**
          *         Remake with Flatlist and connect with Victory Pie
          * */}

          {VICTORY_DATA.map((item) => item
            .map((expenseLabel) => (
              <View style={{
                flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center',
              }}
              >
                <View
                  style={{
                    backgroundColor: colorScale[item.findIndex((value) => value === expenseLabel)],
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    marginRight: 10,
                  }}
                />
                <Text category="h6" appearance="hint">{expenseLabel.i}</Text>
              </View>
            )))}

        </View>
      </View>
    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  compteSection: {
    paddingTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  circles: {
    height: 20, width: 20, borderRadius: 30, marginRight: 10,
  },
});

export default Graphics;
