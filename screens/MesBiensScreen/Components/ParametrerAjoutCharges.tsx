import React, { useState } from 'react';
import {
  Button, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { MotiView } from 'moti';

import Select from '../../../components/Form/Select';
import {
  frequence, typeCharge, typeImpots, typeAssurance, typeBanque, typeDivers,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { Frequency } from '../../../src/API';

import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import Separator from '../../../components/Separator';
import TextInput from '../../../components/Form/TextInput';
import { AvailableValidationRules } from '../../../components/Form/validation';
import Datepicker from '../../../components/Form/DatePicker';

type ParamBudgetForm = {
  category: string,
  category2?: string,
  amount: number,
  frequency: Frequency,
  nextDueDate?: string | null,
  tenantId?: string | null,
  infoCredit?: {
    borrowedCapital?: number,
    loadStartDate?: string | null,
    duration?: number | null,
    interestRate?: number | null,
    assuranceRate?: number | null,
  }
};

const ParametrerAjoutCharges = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();

  // const addTenant = useAddTenant();
  // const createBudgetLine = useCreateBudgetLineMutation();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-revenu'> | RouteProp<TabMesBiensParamList, 'modifier-revenu'>>();
  // const navigation = useNavigation();
  console.log('route ajout charge', route.params);
  const { bien } = useGetRealEstate(route.params.id);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [taxShow, setTaxShow] = useState(false);
  const [assuranceShow, setAssuranceShow] = useState(false);
  const [banqueShow, setBanqueShow] = useState(false);
  const [diversShow, setDiversShow] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);
  // infoCredit
  const [mensualiteCreditShow, setMensualiteCreditShow] = useState(false);

  const validateCharge = (data: ParamBudgetForm) => {
    console.log('Validate charge: ', data);
  };
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
          Ajouter une charge
        </Text>

        <Form<ParamBudgetForm> {...paramBudgetForm}>
          <>

            {/**
               *  Mode de détention
               */}

            <View style={{ paddingBottom: 33 }}>

              <View>
                <Select
                  name="category"
                  data={typeCharge}
                  onChangeValue={(v) => {
                    console.log('typeCharge  item: ', v);
                    if (v === 'Impôts') {
                      setTaxShow(true);
                      setAssuranceShow(false);
                      setBanqueShow(false);
                      setDiversShow(false);
                    } else if (v === 'Assurance') {
                      setTaxShow(false);
                      setAssuranceShow(true);
                      setBanqueShow(false);
                      setDiversShow(false);
                    } else if (v === 'Banque') {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(true);
                      setDiversShow(false);
                    } else if (v === 'Frais divers') {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(false);
                      setDiversShow(true);
                    } else {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(false);
                      setDiversShow(false);
                    }
                    setMontantShow(true);
                    setFrequenceShow(true);
                  }}
                  placeholder="Type De Charges"
                  size="large"
                  appearance="default"
                  status="primary"
                  validators={[AvailableValidationRules.required]}
                />
              </View>
              {taxShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeImpots}
                    onChangeValue={(item) => {
                      // console.log('typeImpots item: ', item);
                    }}
                    placeholder="Type d'Impôts"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>
              ) : (<></>)}
              {assuranceShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeAssurance}
                    onChangeValue={(item) => {
                      // console.log('typeAssurance item: ', item);
                    }}
                    placeholder="Type d'Assurance"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>
              ) : (<></>)}

              {banqueShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeBanque}
                    onChangeValue={(item) => {
                      console.log('typeBanque item: ', item);
                      if (item === 'Mensualité crédit') {
                        setMensualiteCreditShow(true);
                      } else {
                        setMensualiteCreditShow(false);
                      }
                    }}
                    placeholder="Type de Banque"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>
              ) : (<></>)}

              {diversShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeDivers}
                    onChangeValue={(item) => {
                      // console.log('typeAssurance item: ', item);
                    }}
                    placeholder="Divers"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>
              ) : (<></>)}

              <MotiView
                animate={{ height: (mensualiteCreditShow ? 300 : 0) }}
                style={{
                  overflow: 'hidden',
                  // hack pour éviter que le overflow 'hidden' ne cache l'ombre
                  marginHorizontal: -5,
                  paddingHorizontal: 5,
                }}
                transition={{ type: 'timing', duration: 500 }}
              >
                <TextInput
                  name="infoCredit.borrowedCapital"
                  placeholder="Capital emprunté"
                />
                <Datepicker
                  name="infoCredit.loadStartDate"
                  placeholder="La date de début du prêt"
                  icon="calendar-outline"
                />
                <TextInput
                  name="infoCredit.duration"
                  placeholder="La durée"
                />
                <TextInput
                  name="infoCredit.interestRate"
                  placeholder="Le taux d'intérêts"
                />
                <TextInput
                  name="infoCredit.assuranceRate"
                  placeholder="Le taux d'assurance"
                />
              </MotiView>

              <MotiView
                animate={{ height: (montantShow ? 68 : 0) }}
                style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}
                transition={{ type: 'timing', duration: 500 }}
              >
                <TextInput
                  name="amount"
                  placeholder="Saisissez votre montant ici"
                  validators={[{ rule: AvailableValidationRules.required, errorMessage: 'Un montant est requis' }]}
                />
                <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
              </MotiView>

              {frequenceShow
                ? (
                  <View>
                    <Select
                      name="frequency"
                      data={frequence}
                      onChangeValue={() => setDateDerniereEcheanceShow(true)}
                      placeholder="Fréquence"
                      size="large"
                      appearance="default"
                      status="primary"
                    />
                    {dateDerniereEcheanceShow && (
                    <Datepicker
                      name="nextDueDate"
                      placeholder="Date de dernière échéance"
                      icon="calendar-outline"
                      validators={[AvailableValidationRules.required]}
                    />
                    )}
                  </View>
                ) : (<></>)}

            </View>

            <View style={{ marginBottom: 10 }}>
              <Button
                onPress={paramBudgetForm.handleSubmit((data) => {
                  validateCharge(data);
                })}
                size="large"
              >
                Valider
              </Button>
            </View>
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
