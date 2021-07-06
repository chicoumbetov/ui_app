import React, { useEffect, useMemo, useState } from 'react';
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

import moment from 'moment';
import Select from '../../../components/Form/Select';
import {
  frequence, typeCharge, typeImpots, typeAssurance, typeBanque, typeDivers,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import {
  AmortizationTable, BudgetLineType, Frequency,
} from '../../../src/API';

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
import ActionSheet from '../../../components/ActionSheet/ActionSheet';

import TableauAmortissement from './actionSheet/tableauAmortissement';
import SelectComp from '../../../components/Form/Select';
import { removeKeyArray } from '../../../utils/ObjectHelper';

type ParamBudgetForm = {
  category: string,
  category2?: string,
  amount: number,
  householdWaste?: number,
  frequency: Frequency,
  nextDueDate?: string | null,
  infoCredit?: {
    borrowedCapital: number,
    loanStartDate: string,
    duration: number,
    interestRate: number,
    assuranceRate: number,
    amortizationTable?: Array<AmortizationTable > | null,
  }
};
const typeChargeArray = Object.values(typeCharge);
const typeDiversArray = Object.values(typeDivers);
const typeImpotsArray = Object.values(typeImpots);
const typeAssuranceArray = Object.values(typeAssurance);
const typeBanqueArray = Object.values(typeBanque);

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

    console.log('yoyoyooy:', currentBudgetLine);
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
      currentBudgetLine.category = 'assurance';
      setAssuranceShow(true);
    } else if (currentBudgetLine?.category === 'frais_bancaires' || currentBudgetLine?.category === 'mensualite_credit') {
      currentBudgetLine.category2 = currentBudgetLine.category;
      currentBudgetLine.category = 'banque';
      setBanqueShow(true);
      setMensualiteCreditShow(currentBudgetLine?.category2 === 'mensualite_credit');
    }
  }
  const createBudgetLineDeadLine = useCreateBudgetLineDeadlineMutation();

  const validateCharge = async (data: ParamBudgetForm) => {
    let category1: string;
    const {
      category, category2, amount, frequency, nextDueDate, infoCredit, householdWaste,
    } = data;
    if ((category === 'impots' || category === 'assurance' || category === 'banque') && category2) {
      category1 = category2;
    } else {
      category1 = category;
    }
    console.log('info credit :', infoCredit);
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
          if (infoCredit && infoCredit.amortizationTable) {
            const index = infoCredit.amortizationTable.findIndex((item) => item.dueDate === DateUtils.addMonths(nextDueDate, -DateUtils.frequencyToMonths(frequency) * i));
            const thisAmount = infoCredit.amortizationTable[index].amount;
            const thisAssurance = infoCredit.amortizationTable[index].interest;
            const thisInterest = infoCredit.amortizationTable[index].assurance;

            // eslint-disable-next-line no-await-in-loop
            await createBudgetLineDeadLine.createBudgetLineDeadLine({
              variables: {
                input: {
                  budgetLineId: newBugetLine.data?.createBudgetLine.id,
                  realEstateId: route.params.id,
                  type: BudgetLineType.Expense,
                  category: category1,
                  amount: -Math.abs(amount),
                  frequency,
                  infoCredit: {
                    amount: thisAmount,
                    assurance: thisAssurance,
                    interest: thisInterest,
                  },
                  householdWaste,
                  date: DateUtils.addMonths(nextDueDate, -DateUtils.frequencyToMonths(frequency) * i),
                },
              },
            });
          } else {
            // eslint-disable-next-line no-await-in-loop
            await createBudgetLineDeadLine.createBudgetLineDeadLine({
              variables: {
                input: {
                  budgetLineId: newBugetLine.data?.createBudgetLine.id,
                  realEstateId: route.params.id,
                  type: BudgetLineType.Expense,
                  category: category1,
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
    }

    /**
     ?
     */
    navigation.pop();
  };

  const [currentTabAmo, setCurrentTabAmo] = useState<AmortizationTable[]>();
  const infoCredit = paramBudgetForm.getValues('infoCredit');

  const calculeTableauAmortissement = (Show: boolean) => {
    const amortizationTable : AmortizationTable[] = [];

    const currentValue = paramBudgetForm.getValues('infoCredit.amortizationTable');
    if (currentValue) {
      setCurrentTabAmo(currentValue);
    } else if (currentBudgetLine
          && currentBudgetLine.infoCredit
          && currentBudgetLine.infoCredit.amortizationTable) {
      const thisAmortizTable: AmortizationTable[] = currentBudgetLine.infoCredit.amortizationTable;
      paramBudgetForm.setValue('amount', thisAmortizTable[0].amount);
      if (Show) {
        setCurrentTabAmo(thisAmortizTable);
      }
    } else if (infoCredit && infoCredit.borrowedCapital
          && infoCredit.interestRate
          && infoCredit.assuranceRate
          && infoCredit.duration
          && infoCredit.loanStartDate
    ) {
      let amontDue = infoCredit.borrowedCapital;
      const loanStartDate = DateUtils.parseToDateObj(infoCredit.loanStartDate);

      const thisAssurancerate = infoCredit.assuranceRate / 100;
      const thisInterestRate = infoCredit.interestRate / 100;
      const assurance = infoCredit.borrowedCapital * (thisAssurancerate / 12);
      const amount = ((infoCredit.borrowedCapital * (thisInterestRate / 12)) / (1 - ((1 + (thisInterestRate / 12)) ** -infoCredit.duration))) + assurance;

      for (let i = 0; i < infoCredit.duration; i += 1) {
        const interest = amontDue * (thisInterestRate / 12);
        const amortizedCapital = amount - assurance - interest;
        amontDue -= amortizedCapital;
        const dueDate = loanStartDate;
        dueDate?.setMonth(loanStartDate?.getMonth() + 1);
        amortizationTable.push({
          __typename: 'AmortizationTable',
          amount,
          assurance,
          interest,
          amortizedCapital,
          dueDate: moment(dueDate).format('YYYY-MM-DD').toString(),
        });
      }
      paramBudgetForm.setValue('amount', amortizationTable[0].amount);
      if (Show) {
        setCurrentTabAmo(amortizationTable);
      }
      const tabAmorti = removeKeyArray((amortizationTable || []), '__typename');
      paramBudgetForm.setValue('infoCredit.amortizationTable', tabAmorti);
    }
  };

  const demain = new Date();
  demain.setDate(demain.getDate() + 1);
  return (
    <>
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
                      setFrequenceShow(true);
                    } else if (v === 'assurance') {
                      setTaxShow(false);
                      setAssuranceShow(true);
                      setBanqueShow(false);
                      setDiversShow(false);
                      setFrequenceShow(true);
                    } else if (v === 'banque') {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(true);
                      setDiversShow(false);
                      setFrequenceShow(false);
                    } else if (v === 'frais_divers') {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(false);
                      setDiversShow(true);
                      setFrequenceShow(true);
                    } else {
                      setTaxShow(false);
                      setAssuranceShow(false);
                      setBanqueShow(false);
                      setDiversShow(false);
                      setFrequenceShow(true);
                    }
                    setMontantShow(true);
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
                        if (v === 'taxes_foncieres') {
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
                        if (item === 'mensualite_credit') {
                          setMensualiteCreditShow(true);
                          setFrequenceShow(true);
                          paramBudgetForm.setValue('frequency', Frequency.monthly);
                          setDateDerniereEcheanceShow(true);
                        } else {
                          setMensualiteCreditShow(false);
                          setFrequenceShow(true);
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
                    animate={{ height: (mensualiteCreditShow ? 450 : 0) }}
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
                      name="infoCredit.loanStartDate"
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
                    <Button appearance="ghost" onPress={() => { calculeTableauAmortissement(true); }}> Afficher le tableau d'amortissement</Button>
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
                    disabled={mensualiteCreditShow}
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
                        name="householdWaste"
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
                      <SelectComp
                        name="frequency"
                        data={frequence}
                        onChangeValue={() => setDateDerniereEcheanceShow(true)}
                        placeholder="Fréquence"
                        disabled={mensualiteCreditShow}
                        size="large"
                        appearance="default"
                        status="primary"
                      />
                      {dateDerniereEcheanceShow && (
                        <Datepicker
                          name="nextDueDate"
                          placeholder="Date de la prochaine échéance"
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
      <ActionSheet
        title="amortissement"
        before={<></>}
        noSafeArea
        scrollable={false}
        visible={currentTabAmo !== undefined}
        onClose={() => setCurrentTabAmo(undefined)}
      >
        {currentTabAmo !== undefined && (
          <TableauAmortissement
            tabAmo={currentTabAmo}
            borrowedCapital={infoCredit.borrowedCapital}
            onSaved={(item) => {
              setCurrentTabAmo(undefined);
              paramBudgetForm.setValue('infoCredit.amortizationTable', item);
            }}
          />
        )}
      </ActionSheet>
    </>
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
