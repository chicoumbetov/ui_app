import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  I18nConfig, NativeDateService, Text, useTheme,
} from '@ui-kitten/components';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import moment from 'moment';
import 'moment/locale/fr';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import { MotiView } from 'moti';
import DateUtils from '../../utils/DateUtils';
import { useListBankMovement } from '../../src/API/BankMouvement';
import { BankMovementStatus } from '../../src/API';

type GraphicsIIProps = {
  dateStart: Date;
  dateEnd: Date;
  id: string
};

const i18n : I18nConfig = {
  dayNames: {
    short: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    long: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  },
  monthNames: {
    short: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'],
    long: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'October',
      'Novembre',
      'Décembre',
    ],
  },
};
const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1 });

const GraphicsII = (props: GraphicsIIProps) => {
  const { dateStart, dateEnd, id } = props;
  // const start = moment(dateStart).format('YYYY-MM-DD').toString();
  // const end = moment(dateEnd).format('YYYY-MM-DD').toString();
  // console.log(start, end, id);
  const listBankMovement = useListBankMovement(id, BankMovementStatus.Affected, '2021');
  console.log('listBankmovemenrt: ', listBankMovement);

  moment.locale('fr');

  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const [shown, setShown] = useState(false);

  const bankMovementsLocal = listBankMovement.data?.getRealEstate?.bankMovements?.items;

  console.log('bankMovements :', bankMovementsLocal);

  // console.log('bankMovements :', listBankMovement.data?.getRealEstate?.bankMovements?.items);

  /** Object with 3 attributes and its key */

  const { evolutionDataMemo } = useMemo(() => {
    const evolutionData: Array<{
      moisLabel: string,
      moisStart: Date,
      moisEnd: Date,
      income: number,
      expense: number,
      delta: number,
      cumul: number,
    }> = [];
    if (bankMovementsLocal) {
      let currentMonthDate = new Date(dateStart.getTime());
      currentMonthDate.setDate(1);

      while (currentMonthDate <= dateEnd) {
        evolutionData.push({
          moisLabel: moment(currentMonthDate).format('MMM YYYY'),
          /**
           * .updateLocale('fr', {
            monthsShort: [
              'jan', 'fev', 'mars', 'avr', 'mai', 'juin', 'juil',
              'août', 'sep', 'oct', 'nov', 'dec',
            ],
          })
           */
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
        bankMovementsLocal.forEach((item) => {
          if (item) {
            const itemDate = DateUtils.parseToDateObj(item.date);
            if (itemDate >= moisStart && itemDate <= moisEnd) {
              evolutionData[i].delta += item.amount;
              if (item.amount < 0) {
                evolutionData[i].expense += item.amount;
              } else {
                evolutionData[i].income += item.amount;
              }
            }
          }
        });
      });

      evolutionData.reduce((cumul, currentData, i) => {
        evolutionData[i].cumul = cumul + currentData.delta;
        return cumul + currentData.delta;
      }, 0);
    }

    // if we need to use outside of useMemo
    return {
      evolutionDataMemo: evolutionData,
    };
  }, [bankMovementsLocal]);

  if (evolutionDataMemo.length <= 0) {
    return (<></>);
  }

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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Suivi mensuel de la trésorerie</Text>
      </View>

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
                        fontSize: '8px', fill: '#b5b5b5', angle: -45,
                      }}
                    />
                  )}
                  tickValues={evolutionDataMemo.map(
                    ({ moisLabel }) => moisLabel,
                  )}
                  fixLabelOverlap
                />
                <VictoryAxis
                  dependentAxis
                  crossAxis
                  tickLabelComponent={(
                    <VictoryLabel
                      style={{ fontSize: '8px', fill: '#b5b5b5' }}
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
                    evolutionDataMemo.map(
                      ({ expense, moisLabel }) => ({ x: moisLabel, y: -expense }),
                    )
                }
                />
                <VictoryBar
                  // barWidth={10}
                  alignment="end"
                  cornerRadius={{ top: 8, bottom: 8 }}
                  barWidth={16}
                  style={{ data: { fill: theme['color-info-600'] } }}
                  data={evolutionDataMemo.map(
                    ({ income, moisLabel }) => ({ x: moisLabel, y: income }),
                  )}
                />
                <VictoryGroup
                  data={evolutionDataMemo.map(
                    ({ cumul, moisLabel }) => ({ x: moisLabel, y: cumul }),
                  )}
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
                  data={evolutionDataMemo.map(
                    ({ delta, moisLabel }) => ({ x: moisLabel, y: delta }),
                  )}
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
