import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import {
  VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine,
} from 'victory-native';
import MaxWidthContainer from '../MaxWidthContainer';

const entree = [
  { x: 'janvier', y: 500 },
  { x: 'fevrier', y: 700 },
  { x: 'mars', y: 1000 },
  { x: 'avril', y: 400 },
  { x: 'mai', y: 300 },
  { x: 'juin', y: 100 },
];
const sortie = [
  { x: 'avril', y: 600 },
  { x: 'mai', y: 500 },
  { x: 'juin', y: 700 },
];

const delta = [
  { x: 'janvier', y: 500 },
  { x: 'fevrier', y: 700 },
  { x: 'mars', y: 1000 },
  { x: 'avril', y: 600 },
  { x: 'mai', y: 500 },
  { x: 'juin', y: 700 },
  { x: 'juillet', y: 1000 },
  { x: 'aout', y: 600 },
];

const evolution = [
  { x: 'janvier', y: 200 },
  { x: 'fevrier', y: 500 },
  { x: 'mars', y: -300 },
  { x: 'avril', y: 1200 },
  { x: 'mai', y: 600 },
  { x: 'juin', y: -300 },
  { x: 'juillet', y: 200 },
  { x: 'aout', y: 100 },
];

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
        height={1000}
        // maxDomain={{ y: 0 }}
        // minDomain={{ y: 0 }}
        animate={{
          duration: 6000,
          onLoad: { duration: 1000 },
        }}
        /* eslint-disable-next-line max-len */
        // categories={{ x: [ 'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'], }}
        padding={{
          top: 20, bottom: 10, left: 90, right: 40,
        }}
      >
        <VictoryAxis
          // theme={{ }}
          crossAxis
          standalone
          // offsetX={200}
          tickLabelComponent={<VictoryLabel style={{ fontSize: '30px', fill: '#b5b5b5' }} />}
        />
        <VictoryAxis
          dependentAxis
          crossAxis
          standalone={false}
          // label="occurrences"
          tickLabelComponent={<VictoryLabel style={{ fontSize: '30px', fill: '#b5b5b5' }} />}
          style={{
            // axis: { stroke: '#b5b5b5' },
            grid: { stroke: '#b5b5b5' },
          }}
        />
        <VictoryLine
          labelComponent={(
            <VictoryLabel
              style={[
                { fill: 'black', fontSize: 16, fontFamily: 'confortaa_SemiBold' },
                { fill: '#b5b5b5', fontSize: 16, fontFamily: 'confortaa_SemiBold' },
              ]}
            />
            )}
          style={{
            data: { stroke: 'green' },
            parent: { border: '1px solid #ccc' },
          }}
          // interpolation="natural"
          width={250}
          data={delta}
        />
        <VictoryBar
          barWidth={40}
          alignment="start"
          animate={{
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              // eslint-disable-next-line no-underscore-dangle
              after: (datum) => ({ opacity: 1, _y: datum._y }),
            },
          }}
          style={{ data: { fill: theme['color-danger-500'] } }}
          data={entree}
        />
        <VictoryBar
          barWidth={40}
          alignment="end"
          style={{ data: { fill: theme['color-info-400'] } }}
          data={sortie}
        />
        <VictoryArea
          style={{
            data: {
              fill: theme['color-warning-500'], stroke: theme['color-warning-500'], fillOpacity: 0.4, strokeWidth: 3,
            },
            parent: { border: '1px solid #ccc' },
          }}
          // interpolation="natural"
          width={250}
            // categories={{x: ['birds', 'cats', 'dogs', 'fish'],}}
          data={evolution}
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
