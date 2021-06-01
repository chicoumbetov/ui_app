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
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import mouvementData from '../../mockData/mouvementData';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import EditMouvement from './Components/EditMouvement';
import Card from '../../components/Card';
import { TabMaTresorerieParamList } from '../../types';
import { useGetRealEstate } from '../../src/API/RealEstate';
import { BudgetLineType } from '../../src/API';
import Separator from '../../components/Separator';

const MouvBancaires = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'mouv-bancaires'>>();
  const { bien } = useGetRealEstate(route.params.id);
  // const [compte] = useState(comptesData);
  const [currentMvt, setCurrentMvt] = useState();
  const [budget, setBudget] = useState(bien?.budgetLines?.items);

  const [checked, setChecked] = React.useState(false);
  const [ignoreClicked, setIgnoreClicked] = useState(false);
  const [affecte, setAffecte] = useState(false);

  const onIgnorerMouvement = () => {
    navigation.navigate('ignorer-mouvement');
  };

  const onEditMouvement = (items) => {
    setCurrentMvt(items);
    if (items.valeur.substring(0, 1) === '-') {
      setBudget(bien?.budgetLines?.items.filter((item) => {
        if (item?.type === BudgetLineType.Expense && !item?._deleted) {
          return item;
        }
        return false;
      }));
    } else {
      setBudget(bien?.budgetLines?.items.filter((item) => {
        if (item?.type === BudgetLineType.Income && !item?._deleted) {
          return item;
        }
        return false;
      }));
    }
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

        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>

        <CompteHeader title={bien.name} />

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
          {`Mouvements bancaires ${affecte ? ('affectés') : ('')}`}
        </Text>
        <Text category="p2" appearance="hint">
          {affecte
            ? ('Vous pouvez modifier une affectation en sélectionnant le mouvement bancaire.')
            : ('Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.')}
        </Text>
        {affecte
          ? (
            <>
              {mouvementData.map((item) => (
                <Card
                  key={item.id}
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {ignoreClicked
                    ? (
                      <CheckBox
                        checked={checked}
                        onChange={(nextChecked) => setChecked(nextChecked)}
                        status="danger"
                      />
                    )
                    : <></>}

                  <TouchableOpacity
                    onPress={() => onEditMouvement(item)}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{ justifyContent: 'center' }}
                        category="h5"
                        status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
                      >
                        {item.valeur}
                      </Text>
                      <Text
                        style={{ justifyContent: 'center' }}
                        category="h6"
                        status="basic"
                      >
                        {item.category}
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
                      <Text category="p1" appearance="hint">Libellé du mouvement</Text>
                    </View>

                  </TouchableOpacity>
                </Card>
              ))}
            </>
          )
          : (
            <>
              <Button
                size="large"
                onPress={() => setIgnoreClicked(!ignoreClicked)}
                appearance={ignoreClicked ? 'filled' : 'outline'}
                status="danger"
                style={{ marginTop: 20 }}
              >
                Ignorer des mouvements
              </Button>
              {mouvementData.map((item) => (
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
                        checked={checked}
                        onChange={(nextChecked) => setChecked(nextChecked)}
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
                      <Text
                        style={{ justifyContent: 'center' }}
                        category="h5"
                        status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
                      >
                        {item.valeur}
                      </Text>
                      <Text
                        style={{ justifyContent: 'center' }}
                        category="h6"
                        status={item.typeMouvement === 'Validé' ? ('success') : ('warning')}
                      >
                        {item.typeMouvement}
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
                      <Text category="p1" appearance="hint">Libellé du mouvement</Text>
                    </View>

                  </TouchableOpacity>
                </Card>
              ))}
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Text category="h4" style={{ marginBottom: 10 }}>Bon Travail!</Text>
                <Text category="p1">Vous avez affecté tous vos mouvements bancaires.</Text>
              </View>

              <Separator />
              <Card
                style={{ marginVertical: 20 }}
              >
                <TouchableOpacity
                  onPress={() => setAffecte(!affecte)}
                  style={{
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
                </TouchableOpacity>
              </Card>
              <Card
                style={{ marginVertical: 20, marginBottom: 60 }}
              >
                <TouchableOpacity
                  onPress={() => onIgnorerMouvement()}
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

      </MaxWidthContainer>
      <ActionSheet title="test" before={<></>} noSafeArea scrollable={false} visible={currentMvt !== undefined} onClose={() => setCurrentMvt(undefined)}><EditMouvement budget={budget} /></ActionSheet>
    </>
  );
};

// const styles = StyleSheet.create({ container: {} });

export default MouvBancaires;
