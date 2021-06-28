import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine, VictoryScatter,
} from 'victory-native';
import moment from 'moment';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import { MotiView } from 'moti';
import DateUtils from '../../utils/DateUtils';
import { useListBankMovement } from '../../src/API/BankMouvement';

const bankMovements = [
  { date: '2021-01-21', amount: 500 },
  { date: '2021-02-21', amount: -300 },
  { date: '2021-04-21', amount: 1500 },
  { date: '2021-03-21', amount: 500 },
  { date: '2021-03-21', amount: -300 },
  { date: '2021-04-21', amount: 1500 },
  { date: '2021-03-21', amount: -500 },
  { date: '2021-05-21', amount: -500 },
  { date: '2021-03-21', amount: 2500 },
  { date: '2021-06-21', amount: 500 },
  { date: '2021-06-21', amount: -500 },
];

type GraphicsIIProps = {
  dateStart: Date;
  dateEnd: Date;
  id: string
};

const GraphicsII = (props: GraphicsIIProps) => {
  const { dateStart, dateEnd, id } = props;
  const start = moment(dateStart).format('YYYY-MM-DDTHH:mm:ss').toString();
  const end = moment(dateEnd).format('YYYY-MM-DDTHH:mm:ss').toString();
  console.log(start, end, id);
  const listBankMovement = useListBankMovement(id, start, end);
  console.log('oui oui :', listBankMovement);
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const [shown, setShown] = useState(false);

  /** Object with 3 attributes and its key */
  const evolutionData: [
    {
      moisLabel: string,
      moisStart: Date,
      moisEnd : Date,
      income: number,
      expense:number,
      delta: number,
      cumul:number,
    },
  ] = [];

  let currentMonthDate = new Date(dateStart.getTime());
  currentMonthDate.setDate(1);

  moment.locale('fr');

  while (currentMonthDate <= dateEnd) {
    evolutionData.push({
      moisLabel: moment(currentMonthDate).format('MMMM YYYY'),
      moisStart: currentMonthDate,
      moisEnd: DateUtils.lastDayOfMonthDate(currentMonthDate),
      income: 0,
      expense: 0,
      delta: 0,
      cumul: 0,
    });
    currentMonthDate = new Date(currentMonthDate.getTime());
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
  }

  evolutionData.forEach(({ moisStart, moisEnd }, i) => {
    bankMovements.forEach((item) => {
      const itemDate = DateUtils.parseToDateObj(item.date);
      if (itemDate >= moisStart && itemDate <= moisEnd) {
        evolutionData[i].delta += item.amount;
        if (item.amount < 0) {
          evolutionData[i].expense += item.amount;
        } else {
          evolutionData[i].income += item.amount;
        }
      }
    });
  });

  evolutionData.reduce((cumul, currentData, i) => {
    evolutionData[i].cumul = cumul + currentData.delta;
    return cumul + currentData.delta;
  }, 0);

  // console.log('evolutionData', evolutionData);

  const animationDuration = 500;

  return (
    <View
      style={{
        paddingTop: 10,
        borderRadius: 10,
      }}
      onLayout={(event) => {
        setWidth(Math.max(500, event.nativeEvent.layout.width));
      }}
    >
      <VisibilitySensor onChange={(visible) => {
        if (visible && !shown) {
          setShown(true);
        }
      }}
      >
        <ScrollView horizontal style={{ height: 350 }}>
          <View style={{ width, height: 350 }}>
            {shown && (
            <MotiView transition={{ type: 'timing', duration: animationDuration }} from={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <VictoryChart
                height={350}
                width={width}
                domainPadding={{ x: 20 }}
                standalone
              >
                <VictoryAxis
                  crossAxis
                  standalone
                  offsetX={50}
                  style={{
                    ticks: { stroke: '#b5b5b5', size: 8 },
                  }}
                  tickLabelComponent={(
                    <VictoryLabel
                      textAnchor="end"
                      style={{
                        fontSize: '9px', fill: '#b5b5b5', angle: -45,
                      }}
                    />
          )}
                  tickValues={evolutionData.map(({ moisLabel }) => moisLabel)}
                  fixLabelOverlap
                />
                <VictoryAxis
                  dependentAxis
                  crossAxis
                  tickLabelComponent={(
                    <VictoryLabel
                      style={{ fontSize: '9px', fill: '#b5b5b5' }}
                    />
          )}
                  style={{
                    ticks: { stroke: '#b5b5b5', size: 8 },
                  }}
                  domainPadding={{ y: 10 }}
                />
                <VictoryBar
                  alignment="start"
                  cornerRadius={{ top: 8, bottom: 8 }}
                  barWidth={16}
                  style={{ data: { fill: theme['color-danger-500'] } }}
                  data={
                  evolutionData.map(({ expense, moisLabel }) => ({ x: moisLabel, y: -expense }))
                }
                />
                <VictoryBar
          // barWidth={10}
                  alignment="end"
                  cornerRadius={{ top: 8, bottom: 8 }}
                  barWidth={16}
                  style={{ data: { fill: theme['color-info-600'] } }}
                  data={evolutionData.map(({ income, moisLabel }) => ({ x: moisLabel, y: income }))}
                />
                <VictoryGroup
                  data={evolutionData.map(({ cumul, moisLabel }) => ({ x: moisLabel, y: cumul }))}
                >
                  <VictoryLine
                    style={{
                      data: {
                        stroke: theme['color-warning-500'],
                      },
                    }}
                    interpolation="monotoneX"
                  />
                  <VictoryScatter
                  /**
                  animate={{
                    onLoad: {
                      duration: animationDuration,
                      before: () => ({ opacity: 0 }),
                      after: () => ({ opacity: 1 }),
                    },
                  }}
                  */
                    style={{
                      data: { fill: '#000000', opacity: ({ datum }) => datum.opacity },
                    }}
                  />
                </VictoryGroup>
                <VictoryGroup
                  data={evolutionData.map(({ delta, moisLabel }) => ({ x: moisLabel, y: delta }))}
                >
                  <VictoryLine
                    style={{
                      data: {
                        stroke: theme['color-success-400'],
                      },
                    }}
                    interpolation="monotoneX"
                  />
                  <VictoryScatter
                  /**
                  animate={{
                    onLoad: {
                      duration: animationDuration,
                      before: () => ({ opacity: 0 }),
                      after: () => ({ opacity: 1 }),
                    },
                  }}
                  */
                    style={{
                      data: { fill: '#000000', opacity: ({ datum }) => datum.opacity },
                    }}
                  />
                </VictoryGroup>
              </VictoryChart>
            </MotiView>
            )}
          </View>
        </ScrollView>
      </VisibilitySensor>

      <View style={{ marginVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5' }} />
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-info-600'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Total entrées par mois</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-danger-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Total sorties par mois</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-success-400'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Evolution de la trésorerie par mois</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <View style={{
          backgroundColor: theme['color-warning-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text category="h6" appearance="hint">Trésorerie cumulée</Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default GraphicsII;
