import {
  Button,
  Card, CheckBox, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import Icon from '../../../../components/Icon';
import { BudgetLine, BudgetLineType } from '../../../../src/API';

type MonBudgetProps = { budget: BudgetLine[] };

const EditMouvement = (props: MonBudgetProps) => {
  const { budget } = props;
  console.log(budget);
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>

      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Text category="h2" status="success">+500 €</Text>
        <Text category="h6" status="basic" style={{ marginVertical: 10 }}>10/03/2021</Text>
        <Text category="h6" appearance="hint">Libéllé du mouvement</Text>
      </View>
      <ScrollView
        style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}
      >
        <Text
          category="h3"
          style={{ marginTop: 20 }}
        >
          Affecter le mouvement
        </Text>
        <Text category="p1" style={{ marginVertical: 10 }}>
          Revenus enregistés dans votre budget
        </Text>
        <Text category="p1" appearance="hint">
          Sélectionner le revenu correspondant
        </Text>

        {budget.map((item) => (
          <Card
            key={item.id}
            style={{ marginVertical: 15 }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
            >
              <CheckBox
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
                style={{ marginRight: 20 }}
              />
              <View style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text
                  style={{ marginBottom: 15 }}
                  category="h4"
                  status="basic"
                >
                  {item.category}
                </Text>
                <Text
                  category="c1"
                  status={item.type === BudgetLineType.Expense ? ('danger') : ('success')}
                >
                  {item.type === BudgetLineType.Expense ? ('-') : ('+')}
                  {item.amount}
                </Text>

              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  // justifyContent: 'space-evenly',
                  paddingLeft: 10,
                }}
              >
                <Text category="p1" appearance="basic">Mensuel</Text>
                <Text category="p1" appearance="hint">Echéance</Text>
                <Text category="h6" status="basic">{`${moment(item.nextDueDate).format('DD/MM/YYYY')}`}</Text>

              </View>
            </View>
            <View style={{
              backgroundColor: '#f6f6f6',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 25,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
            }}
            >
              <Text category="h6" status="warning">En attente</Text>
              <Text category="h6" status="info">Editer</Text>
              <Text category="h6" status="danger">Supprimer</Text>
            </View>

          </Card>
        ))}

        {checked
          ? (<Button status="success" style={{ marginVertical: 20 }}>Enregistrer</Button>)
          : (
            <>
              <Text category="p1" status="basic" style={{ marginVertical: 20 }}>
                Parametrez et consulter vos charges et revenus dans votre budget.
              </Text>
              <Card
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                  }}
                  style={{
                    flexDirection: 'row', alignItems: 'center',
                  }}
                >
                  <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
                  <Text category="h5">
                    Mon Budget
                  </Text>
                </TouchableOpacity>
              </Card>
            </>
          )}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingVertical: 25,
    paddingHorizontal: 26,
    flex: 1,
    flexGrow: 1,
  },
  window: {
    flexDirection: 'column',
    marginTop: 30,
    // paddingTop: 31,
    // paddingBottom: 28,
    // paddingHorizontal: 37,
    borderRadius: 10,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },
});

export default EditMouvement;
