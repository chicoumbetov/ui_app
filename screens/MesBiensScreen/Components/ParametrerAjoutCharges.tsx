import React, { useEffect, useState } from 'react';
import {

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
import Button from '../../../components/Button';

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
    calculeTableauAmortissement(false);

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
            householdWaste: -Math.abs(householdWaste),
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
            householdWaste: -Math.abs(householdWaste),
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
                    amount: -Math.abs(thisAmount),
                    assurance: -Math.abs(thisAssurance),
                    interest: -Math.abs(thisInterest),
                  },
                  householdWaste: -Math.abs(householdWaste),
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
                  householdWaste: -Math.abs(householdWaste),
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
    if (currentValue && Show) {
      setCurrentTabAmo(currentValue);
    } else if (currentBudgetLine
          && currentBudgetLine.infoCredit
          && currentBudgetLine.infoCredit.amortizationTable) {
      const thisAmortizTable: AmortizationTable[] = currentBudgetLine.infoCredit.amortizationTable;
      paramBudgetForm.setValue('amount', thisAmortizTable[0].amount);
    }
    if (infoCredit && infoCredit.borrowedCapital
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
      const currentDate = new Date();
      let nextDate = new Date();
      for (let i = 0; i < infoCredit.duration; i += 1) {
        const interest = amontDue * (thisInterestRate / 12);
        const amortizedCapital = amount - assurance - interest;
        amontDue -= amortizedCapital;
        const dueDate = loanStartDate;
        dueDate?.setMonth(loanStartDate?.getMonth() + 1);
        console.log('la date due :', currentDate.getMonth() === dueDate.getMonth());

        if (currentDate.getFullYear() === dueDate.getFullYear()) {
          console.log('super test v2 : ', dueDate.getFullYear());
          if (currentDate.getMonth() === dueDate.getMonth()) {
            if (currentDate.getDate() - nextDate.getDate() > currentDate.getDate() - dueDate.getDate() && currentDate.getDate() !== dueDate.getDate()) {
              nextDate = dueDate;
              paramBudgetForm.setValue('nextDueDate', moment(nextDate).format('YYYY-MM-DD').toString());
            }
          } else if (currentDate.getMonth() - nextDate.getMonth() > currentDate.getMonth() - dueDate.getMonth()) {
            nextDate = dueDate;
            paramBudgetForm.setValue('nextDueDate', moment(nextDate).format('YYYY-MM-DD').toString());
          }
        } else if (currentDate.getFullYear() - nextDate.getFullYear() > currentDate.getFullYear() - dueDate.getFullYear()) {
          nextDate = dueDate;
          paramBudgetForm.setValue('nextDueDate', moment(nextDate).format('YYYY-MM-DD').toString());
        }

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
      console.log('ouiouoyhiougougioh :', nextDate);
      if (Show) {
        setCurrentTabAmo(amortizationTable);
      }
      const tabAmorti = removeKeyArray((amortizationTable || []), '__typename');
      paramBudgetForm.setValue('infoCredit.amortizationTable', tabAmorti);
    }
  };

  const isCreating = updateBudgetLine.mutationLoading
      || createBudgetLine.mutationLoading
      || createBudgetLineDeadLine.mutationLoading;

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
                    setTaxFonciereShow(false);
                    setMensualiteCreditShow(false);
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
                  placeholder="Type de charges"
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
                      placeholder="Type d'impôts"
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
                      placeholder="Type d'assurance"
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
                      placeholder="Type de frais bancaire"
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
                    animate={{ height: (mensualiteCreditShow ? 485 : 0) }}
                    style={{
                      overflow: 'hidden',
                      // hack pour éviter que le overflow 'hidden' ne cache l'ombre
                      marginHorizontal: -5,
                      paddingHorizontal: 5,
                    }}
                    transition={{ type: 'timing', duration: 500 }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        name="infoCredit.borrowedCapital"
                        label="Capital emprunté"
                        placeholder="Saisissez votre montant ici"
                        keyboardType="numeric"
                        maskOptions={{
                          type: 'money',
                          options: {
                            precision: 2,
                            separator: ',',
                            delimiter: ' ',
                            unit: '',
                            suffixUnit: ' €',
                          },
                        }}
                        onChangeValue={() => calculeTableauAmortissement(false)}
                        validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                      />
                    </View>
                    <Datepicker
                      name="infoCredit.loanStartDate"
                      label="La date de début du prêt"
                      placeholder="jj/mm/aaaa"
                      icon="calendar-outline"
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        name="infoCredit.duration"
                        label="La durée en mois"
                        placeholder="Saisissez votre montant ici"
                        keyboardType="numeric"
                        onChangeValue={() => calculeTableauAmortissement(false)}
                        validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                        accessoryRight={() => (<Text category="h4">mois</Text>)}
                      />

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        name="infoCredit.interestRate"
                        label="Le taux d'intérêts"
                        placeholder="Saisissez votre montant ici"
                        keyboardType="numeric"
                        onChangeValue={() => calculeTableauAmortissement(false)}
                        validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                      }
                        accessoryRight={() => (<Text category="h4">%</Text>)}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        name="infoCredit.assuranceRate"
                        label="Le taux d'assurance"
                        placeholder="Saisissez votre montant ici"
                        keyboardType="numeric"
                        onChangeValue={() => calculeTableauAmortissement(false)}
                        validators={
                        [AvailableValidationRules.required, AvailableValidationRules.float]
                        }
                        accessoryRight={() => (<Text category="h4">%</Text>)}
                      />
                    </View>
                    <Button appearance="ghost" onPress={() => { calculeTableauAmortissement(true); }}> Afficher le tableau d'amortissement</Button>
                  </MotiView>
                ) : (<></>)}
                <MotiView
                  animate={{ height: (montantShow ? 90 : 0) }}
                  style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'flex-start' }}
                  transition={{ type: 'timing', duration: 500 }}
                >
                  <TextInput
                    name="amount"
                    label="Montant"
                    placeholder="Saisissez votre montant ici"
                    keyboardType="numeric"
                    maskOptions={{
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '-',
                        suffixUnit: ' €',
                      },
                    }}
                    disabled={mensualiteCreditShow}
                    validators={[AvailableValidationRules.required, AvailableValidationRules.float]}
                  />
                </MotiView>
                {taxFonciereShow ? (
                  <>
                    <MotiView
                      animate={{ height: (montantShow ? 90 : 0) }}
                      style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'flex-start' }}
                      transition={{ type: 'timing', duration: 500 }}
                    >
                      <TextInput
                        name="householdWaste"
                        label="Dont Ordures ménagères"
                        placeholder="Saisissez votre montant ici"
                        keyboardType="numeric"
                        maskOptions={{
                          type: 'money',
                          options: {
                            precision: 2,
                            separator: ',',
                            delimiter: ' ',
                            unit: '',
                            suffixUnit: ' €',
                          },
                        }}
                        validators={[
                          AvailableValidationRules.required,
                          AvailableValidationRules.float,
                        ]}
                      />
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
                          disabled={mensualiteCreditShow}
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
                  <Button
                    loading={isCreating}
                    loadingText="Chargement"
                    onPress={paramBudgetForm.handleSubmit((data) => {
                      validateCharge(data);
                    })}
                    size="large"
                  >
                    Enregistrer
                  </Button>

                </View>
              )}
              <Text category="c1" appearance="hint">
                * champs obligatoires
              </Text>
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
