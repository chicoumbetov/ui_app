import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RealEstateItem } from '../../../src/API/RealEstate';
import { BudgetLineItem } from '../../../src/API/BudgetLine';
import Card from '../../../components/Card';

type MonBudgetProps = { budget: BudgetLineItem };

const MonBudgetCard = (props: MonBudgetProps) => {
  const { budget } = props;
  return (
    <View>
      <Card style={{ flexDirection: 'row' }}>
        <View>

          <Text category="h6" style={{ justifyContent: 'center' }}>
            Loyer
          </Text>

          <Text category="h6" status="success">+ 500 €</Text>
        </View>

        <View style={{
          flex: 1,
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        >
          <Text category="s1" status="basic" style={{ marginLeft: 15 }}>
            Mensuel
          </Text>
          <Text category="h6" style={{ marginLeft: 15 }}>
            Echéance
          </Text>
          <Text category="h6" status="basic" style={{ marginLeft: 15 }}>
            03/03/2021
          </Text>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <Text category="h6" status="warning" style={{ marginLeft: 15 }}>
            En attente
          </Text>

        </View>
      </Card>

      <Layout style={styles.button}>
        <TouchableOpacity onPress={() => {}}>
          <Layout style={styles.button}>
            <Text category="h6" status="info" style={styles.buttonTextLeft}>Modifier</Text>
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Layout style={styles.button}>
            <Text category="h6" status="basic">Supprimer</Text>
          </Layout>
        </TouchableOpacity>
      </Layout>
    </View>
  );
};

export default MonBudgetCard;

const styles = StyleSheet.create({

  // Footer
  button: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    marginLeft: 6,
  },
});
