import React, { useState } from 'react';
import {
  Button, Datepicker, Icon, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

import SelectComp from '../../../components/Form/Select';
import {
  loyer, frequence, typeRevenu, typeMontant, montant, typeCharge, typeImpots,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import TextInputComp from '../../../components/Form/TextInput';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { Frequency } from '../../../src/API';
import { useAddTenant } from '../../../src/API/Tenant';
import { useCreateBudgetLineMutation } from '../../../src/API/BudgetLine';
import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import Separator from '../../../components/Separator';

type ParamBudgetForm = {
  category: string,
  amount: number,
  frequency: Frequency,
  nextDueDate?: string | null,
  tenantId?: string | null,
  tenant?: {
    rentalCharges: number,
    managementFees: number,
    lastname: string,
    firstname: string,
    email: string,
    startDate: string,
    endDate: string,
  }
};

type ParamAjoutBienForm = {
  bien: string;
  anneeEcheance: string;
};

const ParametrerAjoutCharges = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();

  // const addTenant = useAddTenant();
  const createBudgetLine = useCreateBudgetLineMutation();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-revenu'> | RouteProp<TabMesBiensParamList, 'modifier-revenu'>>();
  const navigation = useNavigation();
  console.log('route ajout charge', route.params);
  const { bien } = useGetRealEstate(route.params.id);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [revenuLoyer, setRevenuLoyer] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

  const [montantValue, setMontantValue] = useState('Montant');

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {/**
         *  I. Mon Budget
         */}
      <Layout style={styles.container}>
        <Text category="h1" style={{ marginBottom: 20 }}>
          Paramétrer votre budget
        </Text>
        <CompteHeader title={bien?.name} />
      </Layout>
      <Separator />

      {/**
         *  II. Ajouter revenu
         */}
      <Layout style={styles.container}>
        <Text category="s2" status="basic" style={{ marginBottom: 20 }}>
          Ajouter un revenu
        </Text>

        <Form<ParamBudgetForm> {...paramBudgetForm}>
          <>

            {/**
               *  Mode de détention
               */}

            <View>

              <Layout style={{ backgroundColor: 'transparent', paddingBottom: 33 }}>

                <View>
                  <SelectComp
                    name="typeCharge"
                    data={typeCharge}
                    onChangeValue={(v) => {
                      if (v === 'Impôts') {
                        setRevenuLoyer(true);
                      } else {
                        setRevenuLoyer(false);
                      } setMontantShow(true); setFrequenceShow(true);
                    }}
                    placeholder="Type De Revenu"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>

                <View>
                  <SelectComp
                    name="typeImpots"
                    data={typeImpots}
                    onChangeValue={() => {}}
                    placeholder="Type d'Impôts"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>

                {montantShow && (
                <View>
                  <TextInputComp name="montant" placeholder="Saisissez votre montant ici" />
                </View>
                )}

                <View>

                  {frequenceShow
                    && (
                    <Layout style={{ backgroundColor: 'transparent' }}>
                      <SelectComp name="typeRevenu" data={frequence} onChangeValue={() => setDateDerniereEcheanceShow(true)} placeholder="Fréquence" size="large" appearance="default" status="primary" />
                      {dateDerniereEcheanceShow && (
                      <Datepicker placeholder="Date de dernière échéance" />
                      )}
                    </Layout>

                    )}
                </View>

              </Layout>

            </View>

            <Layout style={{ marginBottom: 10 }}>
              <Button
                onPress={paramBudgetForm.handleSubmit((e) => {
                  console.log(e);
                })}
                size="large"
              >
                Valider
              </Button>
            </Layout>
          </>
        </Form>

      </Layout>
    </MaxWidthContainer>
  );
};

export default ParametrerAjoutCharges;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  headerDown: {
    padding: 22,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#37a3de',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerUp: {
    padding: 22,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#5fc4ee',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
