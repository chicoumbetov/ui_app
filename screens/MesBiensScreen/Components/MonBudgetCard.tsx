import { Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, TouchableOpacity, View, Alert,
} from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import moment from 'moment';

import { useLinkTo, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import Card from '../../../components/Card';
import { BudgetLine, BudgetLineType, RealEstate } from '../../../src/API';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMesBiensParamList } from '../../../types';
import { useDeleteBudgetLineMutation } from '../../../src/API/BudgetLine';

type MonBudgetProps = { budget: BudgetLine, realEstate: RealEstate };

const MonBudgetCard = (props: MonBudgetProps) => {
  const { budget, realEstate } = props;
  const theme = useTheme();
  const linkTo = useLinkTo();
  console.log(realEstate);
  const deleteBudgetLine = useDeleteBudgetLineMutation();
  let tenant;
  if (realEstate) {
    tenant = realEstate.tenants?.filter((item) => item.id === budget.tenantId);
  }

  const allerTresorie = () => {
    linkTo('/ma-tresorerie');
  };

  const [frequence, setFrequence] = useState<string>();
  useEffect(() => {
    switch (budget.frequency) {
      default:
        setFrequence('Frequence');
        break;
      case 'monthly':
        setFrequence('Mensuel');
        break;
      case 'fortnightly':
        setFrequence('Bimensuel');
        break;
      case 'quarterly':
        setFrequence('Trimestrielle');
        break;
      case 'annual':
        setFrequence('Annuelle');
        break;
    }
  }, []);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'mon-budget'>>();

  const allerModifierRevenu = () => {
    navigation.navigate('modifier-revenu', { idBudgetLine: budget.id, id: route.params.id });
  };

  const allerModifierCharge = () => {
    navigation.navigate('modifier-charge', { idBudgetLine: budget.id, id: route.params.id });
  };

  const supprimerLeRevenue = async () => {
    Alert.alert(
      'Suppression de revenue',
      '',
      [{
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Valider',
        onPress: async () => {
          await deleteBudgetLine({
            variables: {
              input: {
                id: budget.id,
                _version: budget._version,
              },
            },
          });
        },
      }],
    );
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Card
        style={{ flexDirection: 'row' }}
        onPress={() => { allerTresorie(); }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          // width: 93,
          paddingRight: 20,
          borderRightColor: theme['text-hint-color'],
          borderRightWidth: 1,
        }}
        >
          <Text category="h3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            {`${budget.category}`}
          </Text>
          <Text category="c1" status={budget.type === BudgetLineType.Income ? ('success') : ('danger')}>{`${budget.type === BudgetLineType.Income ? ('+') : ('-')} ${budget.amount} €`}</Text>
          {budget.tenantId && (
          <Text category="c1" appearance="hint">
            {tenant[0].lastname}
          </Text>
          )}

        </View>

        <View style={{
          flex: 1,
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
        >
          <Text category="c1" status="basic" style={{ marginLeft: 15 }}>
            {`${frequence}`}
          </Text>
          <Text category="c1" appearance="hint" style={{ marginLeft: 15 }}>
            Echéance
          </Text>
          <Text category="c1" status="basic" style={{ marginLeft: 15 }}>
            {`${moment(budget.nextDueDate).format('DD/MM/YYYY')}`}
          </Text>
        </View>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <IconUIKitten
            name="checkmark-circle-outline"
            fill={theme['color-success-500']}
            style={{
              height: 20, width: 20, marginRight: 5,
            }}
          />
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#000"
            style={{
              height: 20, width: 20, marginRight: 5, alignItems: 'center',
            }}
          />
        </View>
      </Card>

      <View style={styles.button}>
        <TouchableOpacity onPress={
          () => { budget.type === BudgetLineType.Income ? (allerModifierRevenu()) : (allerModifierCharge()); }
        }
        >
          <Layout style={styles.button}>
            <Text category="h6" status="info" style={styles.buttonTextLeft}>Modifier</Text>
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => supprimerLeRevenue()}>
          <Layout style={styles.button}>
            <Text category="h6" status="basic">Supprimer</Text>
          </Layout>
        </TouchableOpacity>
      </View>
    </MaxWidthContainer>
  );
};

export default MonBudgetCard;

const styles = StyleSheet.create({

  // Footer
  button: {
    flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    marginLeft: 6,
  },
});
