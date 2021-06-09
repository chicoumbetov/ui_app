import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { VictoryPie } from 'victory-native';
import MaxWidthContainer from '../MaxWidthContainer';

type MesBiensDataProps = [
  { x: number, y: number },
];

const Graphics = (props: MesBiensDataProps) => {
  const { data } = props;
  const theme = useTheme();
  const [victoryData, setVictoryData] = useState(data);

  console.log('victoryData', props);
  /**
   amount.reduce((a, b) => {
    return a+b
  }, 0),
   */
  // const variable = Data.push(bien?.budgetLines?.items?.map((item) => item?.amount));
  // const getAmountPourcentage = () => {}
  // console.log('variable', variable, 'Data', Data);

  const myMap = new Map([[23, 1], [24, 3]]);
  let sum = 0;
  myMap.forEach((v) => {
    sum += v;
  });

  console.log(sum);

  return (
    <MaxWidthContainer>
      <Layout style={styles.container}>
        <Layout style={styles.compteSection}>

          <Layout style={{ alignItems: 'center', margin: 30 }}>
            <VictoryPie
              padAngle={4}
              startAngle={-27}
              endAngle={333}
              cornerRadius={30}
              height={272}
              width={272}
              innerRadius={67}
              data={victoryData}
              labels={({ datum }) => `${datum.amount} %`}
              colorScale={[
                theme['color-success-400'],
                theme['color-warning-500'],
                theme['color-info-500'],
                theme['color-danger-500'],
              ]}
            />
          </Layout>

          <Layout style={{
            borderWidth: 1,
            borderColor: '#b5b5b5',
            marginVertical: 20,
          }}
          />

          {/**
        *         Remake with Flatlist and connect with Victory Pie
        * */}
          <Layout style={{
            flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center',
          }}
          >
            <Layout style={{
              backgroundColor: theme['color-info-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Eau</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>

            <Layout style={{
              backgroundColor: theme['color-warning-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Electiricité</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-success-400'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Assurances</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-danger-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Frais Divers</Text>
          </Layout>

        </Layout>
      </Layout>
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
