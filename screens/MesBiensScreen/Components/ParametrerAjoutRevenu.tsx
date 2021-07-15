import React, { useEffect, useState } from 'react';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';

import { MotiView } from 'moti';
import Select from '../../../components/Form/Select';
import { frequence, rentalType, typeRevenu } from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import {
  BudgetLine,
  BudgetLineType, Frequency, RentalType, TenantInfo,
} from '../../../src/API';
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
  rentalCharges: number,
  managementFees: number,
  frequency: Frequency,
  thisRentalType: RentalType,
  nextDueDate: string,
  tenantId?: string | null,
  tenant?: TenantInfo | null
};

const typeRevenueArray = Object.values(typeRevenu);

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
  const { bienget } = useGetRealEstate(route.params.id);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [revenuLoyer, setRevenuLoyer] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

  let currentBudgetLine: Partial<BudgetLine> & Pick<ParamBudgetForm, 'tenant'> | undefined | null;
  // const [currentBudgetLine] = useState(CurrentBudgetLine);

  if (route.params.idBudgetLine) {
    // get budgetLine that is clicked
    currentBudgetLine = bienget.budgetLines?.items?.find(
      (item) => item?.id === route.params.idBudgetLine,
    );
    useEffect(() => {
      setMontantShow(true);
      setFrequenceShow(true);
      setDateDerniereEcheanceShow(true);
    }, []);
    if (currentBudgetLine?.category === 'loyer') {
      // on cherche le locataire
      // get tenant by his tenantId for current budgetLine
      const tenant = bienget.tenants?.filter(
        (item) => item?.id === currentBudgetLine?.tenantId,
      ).pop();
      useEffect(() => {
        setRevenuLoyer(true);
      }, []);

      // both values are put back to current budgetLine
      // then we show in Form as defaultValue
      currentBudgetLine = {
        ...currentBudgetLine,
        tenant,
      };
    }
  } else if (route.params.revenuType) {
    currentBudgetLine = {
      category: route.params.revenuType,
    };
    useEffect(() => {
      setRevenuLoyer(route.params.revenuType === 'loyer');
      setMontantShow(true);
      setFrequenceShow(true);
      setDateDerniereEcheanceShow(true);
    }, [route.params.revenuType]);
  }

  // console.log('data ajout revenu: ', data);

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  const validateBudget = async (data: ParamBudgetForm) => {
    const {
      category, amount, rentalCharges, managementFees, frequency,
      nextDueDate, tenant, thisRentalType,
    } = data;

    console.log('data ajout revenu: ', data);

    if (route.params.idBudgetLine) {
      if (data.category === 'loyer' && currentBudgetLine?.tenantId) {
        let tenantId: string | null = null;
        if (tenant) {
          tenantId = await updateTenant(bienget, {
            ...tenant,
            id: currentBudgetLine.tenantId,
            amount,
            rentalType: thisRentalType,
          });
        }

        await updateBudgetLine.updateBudgetLine({
          variables: {
            input: {
              id: route.params.idBudgetLine,
              category,
              amount,
              managementFees,
              rentalCharges,
              rentalType: thisRentalType,
              frequency,
              nextDueDate,
              tenantId,
              // eslint-disable-next-line no-underscore-dangle
              _version: currentBudgetLine._version as number,
            },
          },
        });
      } else if (currentBudgetLine) {
        await updateBudgetLine.updateBudgetLine({
          variables: {
            input: {
              id: route.params.idBudgetLine,
              category,
              amount,
              managementFees,
              rentalCharges,
              frequency,
              nextDueDate,
              // eslint-disable-next-line no-underscore-dangle
              _version: currentBudgetLine._version as number,
            },
          },
        });
      }
    } else if (data.category === 'loyer') {
      let tenantId: string | null = null;
      if (tenant) {
        tenantId = await addTenant(bienget, {
          ...tenant,
          amount,
          rentalType: thisRentalType,
        });
      }

      const newBugetLine = await createBudgetLine.createBudgetLine({
        variables: {
          input: {
            realEstateId: route.params.id,
            category,
            amount,
            managementFees,
            rentalCharges,
            rentalType: thisRentalType,
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
                rentalType: thisRentalType,
                managementFees,
                rentalCharges,
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
            managementFees,
            rentalCharges,
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
                managementFees,
                rentalCharges,
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

  const demain = new Date();
  demain.setDate(demain.getDate() + 1);

  const isCreating = updateBudgetLine.mutationLoading
      || createBudgetLine.mutationLoading
      || createBudgetLineDeadLine.mutationLoading;
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
              data={typeRevenueArray}
              onChangeValue={(v) => {
                if (v === 'loyer') {
                  setRevenuLoyer(true);
                } else {
                  setRevenuLoyer(false);
                } setMontantShow(true); setFrequenceShow(true);
              }}
              placeholder="Type de revenu"
              size="large"
              appearance="default"
              status="primary"
              validators={[AvailableValidationRules.required]}
              onPress={() => setEtape(1)}
            />
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
              animate={{ height: (revenuLoyer ? 150 : 0) }}
              style={{
                overflow: 'hidden',
                // hack pour éviter que le overflow 'hidden' ne cache l'ombre
                marginHorizontal: -5,
                paddingHorizontal: 5,
              }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput name="rentalCharges" keyboardType="numeric" placeholder="Dont charges" validators={[AvailableValidationRules.float]} />
                <Text category="h4" style={{ marginLeft: 19 }}> €</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput name="managementFees" keyboardType="numeric" placeholder="Dont frais de gestion" validators={[AvailableValidationRules.float, AvailableValidationRules.negative]} />
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
                      placeholder="Date de la prochaine échéance"
                      placement="top"
                      icon="calendar-outline"
                      // pas avant demain
                      // (sinon le cron ne tournera jamais et on aura jamais les échéances)
                      min={demain}
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
                    max={new Date(2500, 0, 1)}
                  />
                  <DatePicker
                    name="tenant.endDate"
                    placeholder="Date de fin de bail"
                    icon="calendar-outline"
                    max={new Date(2500, 0, 1)}
                  />
                  <Select
                    name="thisRentalType"
                    data={rentalType}
                    onChangeValue={() => setDateDerniereEcheanceShow(true)}
                    placeholder="Type de location"
                    size="large"
                    appearance="default"
                    status="primary"
                    validators={[AvailableValidationRules.required]}
                  />
                </View>
              ) : (<></>)}

            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <Button
                onPress={paramBudgetForm.handleSubmit((data) => {
                  validateBudget(data);
                })}
                size="large"
                disabled={isCreating}
                accessoryRight={() => (isCreating ? <Spinner status="basic" /> : <></>)}
              >
                {isCreating ? 'Chargement' : 'Enregistrer'}
              </Button>
            </View>

          </>
        </Form>

      </View>
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
