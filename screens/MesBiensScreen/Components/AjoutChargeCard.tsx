import { Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import moment from 'moment';

import { useLinkTo, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import Card from '../../../components/Card';
import { BudgetLine } from '../../../src/API';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMesBiensParamList } from '../../../types';

type MonBudgetProps = { budget: BudgetLine };

const AjoutChargeCard = (props: MonBudgetProps) => {
  const { budget } = props;
  const theme = useTheme();
  const linkTo = useLinkTo();

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
  const allerModifierCharge = (idBudgetLine: string) => {
    navigation.navigate('modifier-charge', { idBudgetLine, id: route.params.id });
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
          justifyContent: 'space-evenly',
          width: 93,
          paddingRight: 20,
          borderRightColor: theme['text-hint-color'],
          borderRightWidth: 1,
        }}
        >
          <Text category="h3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            {`${budget.category}`}
          </Text>
          <Text category="c1" status="danger">{`- ${budget.amount} €`}</Text>
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
            {`${moment(budget.nextDueDate).format('L')}`}

          </Text>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <Text category="c1" status="warning" style={{ marginLeft: 15 }}>
            En attente
          </Text>
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
        <TouchableOpacity onPress={() => allerModifierCharge(budget.id)}>
          <View style={styles.button}>
            <Text category="h6" status="info" style={styles.buttonTextLeft}>Modifier</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.button}>
            <Text category="h6" status="basic">Supprimer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MaxWidthContainer>
  );
};

export default AjoutChargeCard;

const styles = StyleSheet.create({

  // Footer
  button: {
    flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    marginLeft: 6,
  },
});
