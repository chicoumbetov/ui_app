import React, { useEffect, useState } from 'react';
import {
  Button, Layout, Spinner, Text,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';

import { MotiView } from 'moti';
import Select from '../../../components/Form/Select';
import { frequence, typeRevenu } from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { BudgetLineType, Frequency } from '../../../src/API';
import TextInput from '../../../components/Form/TextInput';
import { TabMesBiensParamList } from '../../../types';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import {
  useCreateBudgetLineMutation,
  useUpdateBudgetLineMutation,
} from '../../../src/API/BudgetLine';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import { useAddTenant, useUpdateTenant } from '../../../src/API/Tenant';
import DatePicker from '../../../components/Form/DatePicker';
import { AvailableValidationRules } from '../../../components/Form/validation';
import Separator from '../../../components/Separator';
import { useCreateBudgetLineDeadlineMutation } from '../../../src/API/BudgetLineDeadLine';
import DateUtils from '../../../utils/DateUtils';

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

const ParametrerAjoutRevenu = () => {
  const paramBudgetForm = useForm<ParamBudgetForm>();
  const addTenant = useAddTenant();
  const updateTenant = useUpdateTenant();
  const createBudgetLine = useCreateBudgetLineMutation();
  const updateBudgetLine = useUpdateBudgetLineMutation();

  const createBudgetLineDeadLine = useCreateBudgetLineDeadlineMutation();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-revenu'> | RouteProp<TabMesBiensParamList, 'modifier-revenu'>>();
  const navigation = useNavigation();
  // console.log('route ajout revenu', route.params);
  const { bien } = useGetRealEstate(route.params.id);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [revenuLoyer, setRevenuLoyer] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

  let currentBudgetLine: ParamBudgetForm | undefined;
  // const [currentBudgetLine] = useState(CurrentBudgetLine);

  if (route.params.idBudgetLine) {
    // get budgetLine that is clicked
    currentBudgetLine = bien.budgetLines?.items?.filter(
      (item) => item?.id === route.params.idBudgetLine,
    ).pop();
    currentBudgetLine.amount = currentBudgetLine.amount.toString();
    useEffect(() => {
      setMontantShow(true);
      setFrequenceShow(true);
      setDateDerniereEcheanceShow(true);
    }, []);
    if (currentBudgetLine?.category === 'Loyer') {
      // on cherche le locataire
      // get tenant by his tenantId for current budgetLine
      const tenant = bien.tenants?.filter(
        (item) => item?.id === currentBudgetLine.tenantId,
      ).pop();
      useEffect(() => {
        setRevenuLoyer(true);
      }, []);
      tenant.rentalCharges = tenant.rentalCharges.toString();
      tenant.managementFees = tenant.managementFees.toString();

      // both values are put back to current budgetLine
      // then we show in Form as defaultValue
      currentBudgetLine = {
        ...currentBudgetLine,
        tenant,
      };
    }
  }

  // console.log('data ajout revenu: ', data);

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  const validateBudget = async (data: ParamBudgetForm) => {
    const {
      category, amount, frequency, nextDueDate, tenant,
    } = data;

    if (route.params.idBudgetLine) {
      if (data.category === 'Loyer' && currentBudgetLine.tenantId) {
        let tenantId: string | null = null;
        if (tenant) {
          tenantId = await updateTenant(bien, {
            id: currentBudgetLine.tenantId,
            ...tenant,
            amount,
          });
        }

        await updateBudgetLine.updateBudgetLine({
          variables: {
            input: {
              id: route.params.idBudgetLine,
              category,
              amount,
              frequency,
              nextDueDate,
              tenantId,
            },
          },
        });
      } else {
        await updateBudgetLine.updateBudgetLine({
          variables: {
            input: {
              id: route.params.idBudgetLine,
              category,
              amount,
              frequency,
              nextDueDate,
              _version: currentBudgetLine._version,
            },
          },
        });
      }
    } else if (data.category === 'Loyer') {
      let tenantId: string | null = null;
      if (tenant) {
        tenantId = await addTenant(bien, {
          ...tenant,
          amount,
        });
      }

      const newBugetLine = await createBudgetLine.createBudgetLine({
        variables: {
          input: {
            realEstateId: route.params.id,
            category,
            amount,
            frequency,
            nextDueDate,
            type: BudgetLineType.Income,
            tenantId,
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
                type: BudgetLineType.Income,
                category,
                amount,
                frequency,
                tenantId,
                date: DateUtils.addMonths(nextDueDate, -DateUtils.frequencyToMonths(frequency) * i),
              },
            },
          });
        }
      }
    } else {
      // console.log('pas normal');
      const newBugetLine = await createBudgetLine.createBudgetLine({
        variables: {
          input: {
            realEstateId: route.params.id,
            category,
            amount,
            frequency,
            nextDueDate,
            type: BudgetLineType.Income,
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
                type: BudgetLineType.Income,
                category,
                amount,
                frequency,
                date: DateUtils.addMonths(nextDueDate, -DateUtils.frequencyToMonths(frequency) * i),
              },
            },
          });
        }
      }
    }

    /**
     Navigate to previous target page - page with list of budget lines (MonBudget component)
     */
    navigation.pop();
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
          Ajouter un revenu
        </Text>

        <Form
          {...paramBudgetForm}
          defaultValues={currentBudgetLine}
        >
          <>

            {/**
           *  Type de revenu
           */}

            <Select
              name="category"
              data={typeRevenu}
              onChangeValue={(v) => {
                if (v === 'Loyer') {
                  setRevenuLoyer(true);
                } else {
                  setRevenuLoyer(false);
                } setMontantShow(true); setFrequenceShow(true);
              }}
              placeholder="Type De Revenu"
              size="large"
              appearance="default"
              status="primary"
              validators={[AvailableValidationRules.required]}
              onPress={() => setEtape(1)}
            />

            {/**
            <TouchableOpacity
              onPress={() => { setEtape(1); }}
              style={etape === 0 ? (styles.headerDown) : (styles.headerUp)}
            >
              <Text category="h6" status="control">
                Montant
              </Text>
              {
                etape === 0
                  ? <Icon
                  name="arrow-ios-downward-outline"
                  fill={theme['color-basic-100']}
                  style={{ height: 20, width: 20 }}
                  />
                  : <Icon
                  name="arrow-ios-upward-outline"
                  fill={theme['color-basic-100']}
                  style={{ height: 20, width: 20 }}
                  />
              }
            </TouchableOpacity>
            */}
            <MotiView
              animate={{ height: (etape === 0 && montantShow ? 68 : 0) }}
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
            {revenuLoyer && (
            <MotiView
              animate={{ height: (revenuLoyer ? 136 : 0) }}
              style={{
                overflow: 'hidden',
                // hack pour éviter que le overflow 'hidden' ne cache l'ombre
                marginHorizontal: -5,
                paddingHorizontal: 5,
              }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput name="tenant.rentalCharges" keyboardType="numeric" placeholder="Dont charges" validators={[AvailableValidationRules.float]} />
                <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput name="tenant.managementFees" keyboardType="numeric" placeholder="Dont frais de gestion" validators={[AvailableValidationRules.float]} />
                <Text category="h4" style={{ marginLeft: 19 }}>€</Text>
              </View>

            </MotiView>
            )}

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
                    validators={[AvailableValidationRules.required]}
                  />
                  {dateDerniereEcheanceShow && (
                    <DatePicker
                      name="nextDueDate"
                      placeholder="Date de dernière échéance"
                      icon="calendar-outline"
                      validators={[AvailableValidationRules.required]}
                    />
                  )}
                </View>
              ) : (<></>)}

            {revenuLoyer
              ? (
                <View>
                  <Text category="h5">Ajouter un locataire</Text>
                  <TextInput name="tenant.firstname" placeholder="Saisissez le prénom" />
                  <TextInput name="tenant.lastname" placeholder="Saisissez le nom" />
                  <TextInput
                    name="tenant.email"
                    placeholder="Saisissez le mail"
                    validators={[AvailableValidationRules.email]}
                  />
                  <DatePicker
                    name="tenant.startDate"
                    placeholder="Date de début de bail"
                    icon="calendar-outline"
                  />
                  <DatePicker
                    name="tenant.endDate"
                    placeholder="Date de fin de bail"
                    icon="calendar-outline"
                  />
                </View>
              ) : (<></>)}

            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              {updateBudgetLine.mutationLoading || createBudgetLine.mutationLoading || createBudgetLineDeadLine.mutationLoading
                ? (
                  <Button
                    onPress={paramBudgetForm.handleSubmit((data) => validateBudget(data))}
                    size="large"
                    accessoryRight={() => <Spinner status="basic" />}
                    disabled
                  >
                    Chargement

                  </Button>
                )
                : (
                  <Button
                    onPress={paramBudgetForm.handleSubmit((data) => validateBudget(data))}
                    size="large"
                  >
                    Enregistrer

                  </Button>
                )}
            </View>

          </>
        </Form>

      </Layout>
    </MaxWidthContainer>
  );
};

export default ParametrerAjoutRevenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  headerDown: {
    padding: 22,
    // marginBottom: 36,
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
