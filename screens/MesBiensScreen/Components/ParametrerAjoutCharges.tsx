import React, { useEffect, useState } from 'react';
import {
  Button,
  Spinner, Text,
  // useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { MotiView } from 'moti';

import Select from '../../../components/Form/Select';
import {
  frequence, typeCharge, typeImpots, typeAssurance, typeBanque, typeDivers, typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { AmortizationTable, BudgetLineType, Frequency } from '../../../src/API';

import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import Separator from '../../../components/Separator';
import TextInput from '../../../components/Form/TextInput';
import { AvailableValidationRules } from '../../../components/Form/validation';
import Datepicker from '../../../components/Form/DatePicker';
import {
  useCreateBudgetLineMutation,
  useUpdateBudgetLineMutation,
} from '../../../src/API/BudgetLine';
import DateUtils from '../../../utils/DateUtils';
import { useCreateBudgetLineDeadlineMutation } from '../../../src/API/BudgetLineDeadLine';
import ReadOnly from '../../../components/ReadOnly';

type ParamBudgetForm = {
  category: string,
  category2?: string,
  amount: number,
  householdWaste?: number,
  frequency: Frequency,
  nextDueDate?: string | null,
  infoCredit?: {
    borrowedCapital: number,
    loadStartDate: string,
    duration: number,
    interestRate: number,
    assuranceRate: number,
    amortizationTable?: Array<AmortizationTable | null > | null,
  }
};
const typeChargeArray = Object.values(typeCharge);
const typeDiversArray = Object.values(typeDivers);
const typeImpotsArray = Object.values(typeImpots);
const typeAssuranceArray = Object.values(typeAssurance);
const typeBanqueArray = Object.values(typeBanque);

console.log(typeChargeArray);

const ParametrerAjoutCharges = () => {
  // const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();
  const createBudgetLine = useCreateBudgetLineMutation();
  const updateBudgetLine = useUpdateBudgetLineMutation();

  // const addTenant = useAddTenant();
  // const createBudgetLine = useCreateBudgetLineMutation();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-revenu'> | RouteProp<TabMesBiensParamList, 'modifier-revenu'>>();
  const navigation = useNavigation();
  const { bienget } = useGetRealEstate(route.params.id);
  const readOnly = ReadOnly.readOnly(route.params.id);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [taxShow, setTaxShow] = useState(false);
  const [taxFonciereShow, setTaxFonciereShow] = useState(false);
  const [assuranceShow, setAssuranceShow] = useState(false);
  const [banqueShow, setBanqueShow] = useState(false);
  const [diversShow, setDiversShow] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);
  // infoCredit
  const [mensualiteCreditShow, setMensualiteCreditShow] = useState(false);

  let currentBudgetLine: ParamBudgetForm | undefined;

  if (route.params.idBudgetLine) {
    // get budgetLine that is clicked
    currentBudgetLine = bienget.budgetLines?.items?.filter(
      (item) => item?.id === route.params.idBudgetLine,
    ).pop();
    currentBudgetLine.amount = currentBudgetLine.amount.toString();
    useEffect(() => {
      setMontantShow(true);
      setFrequenceShow(true);
      setDateDerniereEcheanceShow(true);
    }, []);
    if (currentBudgetLine?.category === 'taxes_foncieres' || currentBudgetLine?.category === 'taxes_habitation' || currentBudgetLine?.category === 'contribution_sociales') {
      currentBudgetLine.category2 = currentBudgetLine.category;
      currentBudgetLine.category = 'impots';
      setTaxShow(true);
    } else if (currentBudgetLine?.category === 'assurance_bien' || currentBudgetLine?.category === 'loyer_impaye' || currentBudgetLine?.category === 'vacances_locatives') {
      currentBudgetLine.category2 = currentBudgetLine.category;
      currentBudgetLine.category = 'assurence';
      setAssuranceShow(true);
    } else if (currentBudgetLine?.category === 'Frais bancaires') {
      currentBudgetLine.category2 = currentBudgetLine.category;
      currentBudgetLine.category = 'banque';
      setBanqueShow(true);
    } else if (currentBudgetLine?.category === 'Mensualité crédit') {
      currentBudgetLine.category2 = currentBudgetLine.category;
      currentBudgetLine.category = 'banque';
      setBanqueShow(true);
      setMensualiteCreditShow(true);
    }
  }
  const createBudgetLineDeadLine = useCreateBudgetLineDeadlineMutation();

  const validateCharge = async (data: ParamBudgetForm) => {
    let category1: string;
    const {
      category, category2, amount, frequency, nextDueDate, infoCredit, householdWaste,
    } = data;
    if ((category === 'Impôts' || category === 'Assurance' || category === 'Banque') && category2) {
      category1 = category2;
    } else {
      category1 = category;
    }

    if (route.params.idBudgetLine) {
      await updateBudgetLine.updateBudgetLine({
        variables: {
          input: {
            id: route.params.idBudgetLine,
            category: category1,
            amount: -Math.abs(amount),
            frequency,
            nextDueDate,
            infoCredit,
            householdWaste,
            _version: currentBudgetLine._version,
          },
        },
      });
    } else {
      const newBugetLine = await createBudgetLine.createBudgetLine({
        variables: {
          input: {
            realEstateId: route.params.id,
            category: category1,
            amount: -Math.abs(amount),
            frequency,
            nextDueDate,
            infoCredit,
            householdWaste,
            type: BudgetLineType.Expense,
          },
        },
      });
      if (newBugetLine.data?.createBudgetLine && nextDueDate && frequency) {
        for (let i = 0; i < 3; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          await createBudgetLineDeadLine.createBudgetLineDeadLine({
            variables: {
              input: {
                budgetLineId: newBugetLine.data?.createBudgetLine.id,
                realEstateId: route.params.id,
                type: BudgetLineType.Expense,
                category,
                amount: -Math.abs(amount),
                frequency,
                householdWaste,
                date: DateUtils.addMonths(nextDueDate, -DateUtils.frequencyToMonths(frequency) * i),
              },
            },
          });
        }
      }
    }

    /**
     ?
     */
    navigation.pop();
  };

  const demain = new Date();
  demain.setDate(demain.getDate() + 1);
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
      <View style={styles.container}>
        <Text category="h1" style={{ marginBottom: 20 }}>
          Paramétrer votre budget
        </Text>
        <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
      </View>
      <Separator />

      {/**
      *  II. Ajouter revenu
      */}
      <View style={styles.container}>
        <Text category="s2" status="basic" style={{ marginBottom: 20 }}>
          Ajouter une charge
        </Text>

        <Form
          {...paramBudgetForm}
          defaultValues={currentBudgetLine}
        >
          <>

            {/**
               *  Mode de détention
               */}

            <View style={{ paddingBottom: 33 }}>

              <Select
                name="category"
                data={typeChargeArray}
                onChangeValue={(v) => {
                  if (v === 'impots') {
                    setTaxShow(true);
                    setAssuranceShow(false);
                    setBanqueShow(false);
                    setDiversShow(false);
                  } else if (v === 'assurence') {
                    setTaxShow(false);
                    setAssuranceShow(true);
                    setBanqueShow(false);
                    setDiversShow(false);
                  } else if (v === 'banque') {
                    setTaxShow(false);
                    setAssuranceShow(false);
                    setBanqueShow(true);
                    setDiversShow(false);
                  } else if (v === 'frais_divers') {
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

              {taxShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeImpotsArray}
                    placeholder="Type d'Impôts"
                    size="large"
                    appearance="default"
                    status="primary"
                    onChangeValue={(v) => {
                      if (v === 'Taxes Foncières') {
                        setTaxFonciereShow(true);
                      } else {
                        setTaxFonciereShow(false);
                      }
                    }}
                  />
                </View>
              ) : (<></>)}
              {assuranceShow ? (
                <View>
                  <Select
                    name="category2"
                    data={typeAssuranceArray}
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
                    data={typeBanqueArray}
                    onChangeValue={(item) => {
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
                    data={typeDiversArray}
                    placeholder="Divers"
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </View>
              ) : (<></>)}
              {mensualiteCreditShow ? (
                <MotiView
                  animate={{ height: (mensualiteCreditShow ? 420 : 0) }}
                  style={{
                    overflow: 'hidden',
                    // hack pour éviter que le overflow 'hidden' ne cache l'ombre
                    marginHorizontal: -5,
                    paddingHorizontal: 5,
                  }}
                  transition={{ type: 'timing', duration: 500 }}
                >
                  <Text>Capital emprunté</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      name="infoCredit.borrowedCapital"
                      placeholder="Capital emprunté"
                      keyboardType="numeric"
                      validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                    />
                    <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
                  </View>
                  <Text>La date de début du prêt</Text>
                  <Datepicker
                    name="infoCredit.loadStartDate"
                    placeholder="La date de début du prêt"
                    icon="calendar-outline"
                  />
                  <Text>La durée en mois</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      name="infoCredit.duration"
                      placeholder="La durée en mois"
                      keyboardType="numeric"
                      validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                    />
                    <Text category="h4" style={{ marginLeft: 19 }}>mois</Text>
                  </View>
                  <Text>Le taux d'intérêts</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      name="infoCredit.interestRate"
                      placeholder="Le taux d'intérêts"
                      keyboardType="numeric"
                      validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                    />
                    <Text category="h4" style={{ marginLeft: 19 }}>%</Text>
                  </View>

                  <Text>Le taux d'assurance</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      name="infoCredit.assuranceRate"
                      placeholder="Le taux d'assurance"
                      keyboardType="numeric"
                      validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                    />
                    <Text category="h4" style={{ marginLeft: 19 }}>%</Text>
                  </View>
                </MotiView>
              ) : (<></>)}
              {montantShow ? <Text>Montant</Text> : <></>}
              <MotiView
                animate={{ height: (montantShow ? 75 : 0) }}
                style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}
                transition={{ type: 'timing', duration: 500 }}
              >
                <TextInput
                  name="amount"
                  placeholder="Saisissez votre montant ici"
                  keyboardType="numeric"
                  validators={[AvailableValidationRules.required, AvailableValidationRules.float]}
                />
                <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
              </MotiView>
              {taxFonciereShow ? (
                <>
                  <Text>Dont Ordures ménagères</Text>
                  <MotiView
                    animate={{ height: (montantShow ? 75 : 0) }}
                    style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}
                    transition={{ type: 'timing', duration: 500 }}
                  >
                    <TextInput
                      name="amount"
                      placeholder="Saisissez votre montant ici"
                      keyboardType="numeric"
                      validators={[AvailableValidationRules.required, AvailableValidationRules.float]}
                    />
                    <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
                  </MotiView>
                </>
              ) : (<></>)}
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
                      // pas avant demain
                      // (sinon le cron ne tournera jamais et on aura jamais les échéances)
                      min={demain}
                      validators={[AvailableValidationRules.required]}
                    />
                    )}
                  </View>
                ) : (<></>)}

            </View>
            {!readOnly && (
            <View style={{ marginBottom: 10 }}>
              {updateBudgetLine.mutationLoading || createBudgetLine.mutationLoading ? (
                <Button
                  onPress={paramBudgetForm.handleSubmit((data) => {
                    validateCharge(data);
                  })}
                  size="large"
                  accessoryRight={() => <Spinner status="basic" />}
                  disabled
                >
                  Valider
                </Button>
              ) : (
                <Button
                  onPress={paramBudgetForm.handleSubmit((data) => {
                    validateCharge(data);
                  })}
                  size="large"
                >
                  Valider
                </Button>
              )}

            </View>
            )}

          </>
        </Form>

      </View>
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
