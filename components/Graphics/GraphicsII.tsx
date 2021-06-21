import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { VictoryBar, VictoryChart, VictoryLine } from 'victory-native';
import MaxWidthContainer from '../MaxWidthContainer';

const GraphicsII = () => {
  const theme = useTheme();
  return (
    <MaxWidthContainer
      outerViewProps={{
        style: {
          paddingTop: 10,
          padding: 20,
          borderRadius: 10,
        },
      }}
    >

      <VictoryChart
        domain={{ x: [0.5, 5.5], y: [0, 10] }}
        domainPadding={{ x: 100 }}
        padding={{
          top: 40, bottom: 80, left: 40, right: 80,
        }}
      >
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          interpolation="natural"
          height={250}
          width={200}
          animate={{
            duration: 6000,
            onLoad: { duration: 1000 },
          }}
          categories={{
            x: ['birds', 'cats', 'dogs', 'fish'],
          }}
          data={[
            {
              x: 1, y: 1, label: 'first', symbol: 'star', opacity: 0.5, fill: 'blue',
            },
            {
              x: 2, y: 2, label: 'second', symbol: 'circle', opacity: 0.8, fill: 'red',
            },
            {
              x: 3, y: 3, label: 'third', symbol: 'square', fill: 'gold',
            },
            {
              x: 4, y: 4, label: 'fourth', symbol: 'diamond', fill: 'green',
            },
          ]}
        />
        <VictoryBar
          height={250}
          barWidth={20}
          data={[
            {
              x: 1, y: 1, label: 'first', symbol: 'star', opacity: 0.5, fill: 'blue',
            },
            {
              x: 2, y: 2, label: 'second', symbol: 'circle', opacity: 0.8, fill: 'red',
            },
            {
              x: 3, y: 3, label: 'third', symbol: 'square', fill: 'gold',
            },
            {
              x: 4, y: 4, label: 'fourth', symbol: 'diamond', fill: 'green',
            },
          ]}
        />
      </VictoryChart>

      <View style={{ marginVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5' }} />
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-info-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Total Entrée par mois</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-danger-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Evolution de la trésorerie par mois</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-success-400'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Delta trésorerie Cumul</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-warning-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Evolution de la trésorerie par mois</Text>
      </View>

    </MaxWidthContainer>
  );
};

// const styles = StyleSheet.create({});

export default GraphicsII;
