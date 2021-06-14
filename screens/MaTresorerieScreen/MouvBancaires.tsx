/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import {
  Button, CheckBox, Text, useTheme,
} from '@ui-kitten/components';
import {
  TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import ActionSheet from '../../components/ActionSheet/ActionSheet';
import EditMouvement from './Components/EditMouvement';
import Card from '../../components/Card';
import { TabMaTresorerieParamList } from '../../types';
import { useGetRealEstate } from '../../src/API/RealEstate';
import { BudgetLineType } from '../../src/API';
import Separator from '../../components/Separator';
import Amount from '../../components/Amount';
import {
  useGetBankMouvement,
  useGetBankMovementByBankAccountId, useUpdateBankMovement,
} from '../../src/API/BankMouvement';

const MouvBancaires = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'mouv-bancaires'>>();
  const { bien } = useGetRealEstate(route.params.id);
  const { bankMouvement } = useGetBankMovementByBankAccountId(route.params.idCompte);
  const useUpdateBankMouvement = useUpdateBankMovement();
  console.log('mouvement ', bankMouvement);
  const movementPasAffect = bankMouvement.filter((item) => {
    if (item.ignored || item.realEstateId) {
      return false;
    }
    return item;
  });

  // const [compte] = useState(comptesData);
  const [currentMvt, setCurrentMvt] = useState();

  const [budget, setBudget] = useState(bien?.budgetLineDeadlines?.items);
  // console.log('mmmm :', bien?.budgetLineDeadlines?.items?.map((item) => item?.amount));

  // const [checked, setChecked] = React.useState(false);
  const [checked, setChecked] = React.useState<string[]>([]);

  const [ignoreClicked, setIgnoreClicked] = useState(false);

  const isChecked = (id:string): boolean => checked.indexOf(id) > -1;

  const checkFunction = (nextChecked: boolean, id:string) => {
    const newCheckedState = checked.filter((currentId) => currentId !== id);
    if (nextChecked) {
      newCheckedState.push(id);
    }

    setChecked(newCheckedState);
    console.log('check ', checked);
  };
  const onIgnorerMouvement = (id?: string) => {
    navigation.navigate('ignorer-mouvement', { idCompte: id, id: route.params.id });
  };

  const onAffecterMouvement = (id?: string) => {
    navigation.navigate('affecter-mouvement', { idCompte: id, id: route.params.id });
  };

  const [thisamount, setAmount] = useState(0);

  const onEditMouvement = (items) => {
    setCurrentMvt(items);
    setAmount(items.valeur);

    if (items.valeur < 0) {
      console.log(items.valeur);
      setBudget(bien?.budgetLineDeadlines?.items.filter((item) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item?.type === BudgetLineType.Expense && !item?._deleted) {
          return item;
        }
        return false;
      }));
    } else {
      setBudget(bien?.budgetLineDeadlines?.items.filter((item) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item?.type === BudgetLineType.Income && !item?._deleted) {
          return item;
        }
        return false;
      }));
    }
  };

  const ignorerMovement = () => {
    checked.reduce(async (promise, id) => {
      await promise;
      useUpdateBankMouvement.updateBankMovement({
        variables: {
          input: {
            id,
            ignored: true,
          },
        },
      });
    }, Promise.resolve());
  };

  return (
    <>
      <MaxWidthContainer
        withScrollView="keyboardAware"
        outerViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            padding: 25,
          },
        }}
      >

        <CompteHeader title={bien?.name} />

        <View style={{
          marginTop: 20,
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#b5b5b5',
        }}
        >
          <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
          <Text category="h6" appearance="hint">FR76**************583</Text>
          <Text category="h6" status="basic">Société Générale</Text>
        </View>

        <Text
          category="s2"
          style={{
            marginBottom: 20, paddingTop: 30,
          }}
        >
          Mouvements bancaires
        </Text>
        <Text category="p2" appearance="hint">
          Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.
        </Text>

        <>
          <Button
            size="large"
            onPress={() => { ignorerMovement(); setIgnoreClicked(!ignoreClicked); }}
            appearance={ignoreClicked ? 'filled' : 'outline'}
            status="danger"
            style={{ marginTop: 20 }}
          >
            Ignorer des mouvements
          </Button>
          {movementPasAffect.map((item) => (
            <Card
              key={item.id}
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {ignoreClicked
                ? (
                  <CheckBox
                              // checked={checked}
                              // onChange={(nextChecked) => setChecked(nextChecked)}
                    checked={isChecked(item.id)}
                    onChange={
                                (nextChecked) => checkFunction(nextChecked, item.id)
                              }
                    status="danger"
                  />
                )
                : <></>}

              <TouchableOpacity
                onPress={() => onEditMouvement(item)}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    marginLeft: 20,
                  }}
                >
                  <Amount amount={item.amount} category="h5" />
                  <Text
                    style={{ justifyContent: 'center' }}
                    category="h6"
                    status="warning"
                  >
                    En attente
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    paddingLeft: 10,
                  }}
                >
                  <Text category="h6" status="basic">{item.date}</Text>
                  <Text category="p1" appearance="hint">{item.description}</Text>
                </View>

              </TouchableOpacity>
            </Card>
          ))}
          {/**
                if data.length = 0 then show message below
                else hide
              */}
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text category="h4" style={{ marginBottom: 10 }}>Bon Travail!</Text>
            <Text category="p1">Vous avez affecté tous vos mouvements bancaires.</Text>
          </View>
          {ignoreClicked
            ? (
              <></>
            )
            : (
              <>
                <Separator />
                <Card
                  onPress={() => { onAffecterMouvement(bien.id); }}
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: theme['color-basic-100'],
                  }}
                >
                  <Text category="h6" status="basic">Mouvements affectés</Text>
                  <IconUIKitten
                    name="arrow-ios-forward"
                    fill="#000"
                    style={{
                      height: 20, width: 20, alignItems: 'center',
                    }}
                  />
                </Card>
                <Card
                  style={{ marginVertical: 20, marginBottom: 60 }}
                >
                  <TouchableOpacity
                    onPress={() => onIgnorerMouvement(bien.id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: theme['color-basic-100'],
                    }}
                  >
                    <Text category="h6" status="basic">Mouvements ignorés</Text>
                    <IconUIKitten
                      name="arrow-ios-forward"
                      fill="#000"
                      style={{
                        height: 20, width: 20, alignItems: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </Card>
              </>
            )}

        </>

      </MaxWidthContainer>

      <ActionSheet title="test" before={<></>} noSafeArea scrollable={false} visible={currentMvt !== undefined} onClose={() => setCurrentMvt(undefined)}><EditMouvement budget={budget} amount={thisamount} /></ActionSheet>
    </>
  );
};

// const styles = StyleSheet.create({ container: {} });

export default MouvBancaires;
