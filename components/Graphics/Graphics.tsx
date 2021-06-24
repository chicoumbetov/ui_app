import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

import { VictoryLabel, VictoryPie } from 'victory-native';

import MaxWidthContainer from '../MaxWidthContainer';

type MesBiensDataProps = {
  data: {
    [key: string]: { value: number, percentage: number, label: string }
  }
};

const Graphics = ({ data }: MesBiensDataProps) => {
  const theme = useTheme();
  // console.log('theme: ', theme);

  /** To avoid displayment of values equal to 0 */
  // .filter((y) => y > 0)
  const [victorydata, setVictoryData] = useState(Object.entries(data).map(
    (item, index) => (
      { x: 0, y: index === 0 ? 100 : 0, i: item[1].label }),
  ));
  // console.log('data :', data);

  useEffect(() => {
    const victory = Object.entries(data).map(
      (item) => ({ x: item[1].value, y: item[1].percentage, i: item[1].label }),
    );
    setVictoryData(victory); // Setting the data that we want to display
  }, []);

  // console.log('victory', victory);

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
          borderRadius: 10,
        },
      }}
    >

      <View style={{ alignItems: 'center', margin: 30 }}>
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
                {
                  fill: 'black', fontSize: 16, // fontFamily: 'confortaa_SemiBold',
                },
                {
                  fill: '#b5b5b5', fontSize: 16, // fontFamily: 'confortaa_SemiBold',
                },
              ]}
            />
            )}
          colorScale={colorscale}
        />
      </View>

      <View style={{
        borderWidth: 0.5,
        borderColor: '#b5b5b5',
        marginVertical: 20,
      }}
      />

      {/**
          *  Legend of graphic by iteration of colors according on category index
          * */}

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
              <Text category="h6" appearance="hint">{item.i}</Text>
            </View>
            )
      ))}

    </MaxWidthContainer>
  );
};

// const styles = StyleSheet.create({});

export default Graphics;
