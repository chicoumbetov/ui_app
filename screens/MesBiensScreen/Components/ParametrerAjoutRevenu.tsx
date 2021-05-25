import React, { useState } from 'react';
import {
  Button, Icon, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useForm } from 'react-hook-form';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';

import { MotiView } from 'moti';
import SelectComp from '../../../components/Form/Select';
import {
  frequence, typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { Frequency, TenantInfo } from '../../../src/API';
import DatepickerComp from '../../../components/Form/DatePicker';
import TextInput from '../../../components/Form/TextInput';
import { TabMesBiensParamList } from '../../../types';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import { createBudgetLineMutation, useGetBudgetLine } from '../../../src/API/BudgetLine';
import { useGetRealEstate } from '../../../src/API/RealEstate';

type ParamBudgetForm = {
  category: string,
  amount?: number | null,
  frequency?: Frequency | null,
  nextDueDate?: string | null,
  tenants: TenantInfo | null,
  Expense?: string,
  Income?: string,
};

const ParametrerAjoutRevenu = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-revenu'>>();
  console.log('route ajout revenu', route);
  const { data } = useGetRealEstate(route.params.id);
  // console.log('data ajout revenu: ', data);

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [revenuLoyer, setRevenuLoyer] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  const validateBudget = (data: ParamBudgetForm) => {
    console.log('ParametrerAjoutRevenu data:', data);
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
        <CompteHeader title={data?.getRealEstate?.name} />
      </Layout>

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
           *  Type de revenu
           */}

            <SelectComp
              name="category"
              data={typeRevenu}
              onChangeValue={(v) => {
                if (v === 'rent') {
                  setRevenuLoyer(true);
                } else {
                  setRevenuLoyer(false);
                } setMontantShow(true); setFrequenceShow(true);
              }}
              placeholder="Type De Revenu"
              size="large"
              appearance="default"
              status="primary"
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
                  ? <Icon name="arrow-ios-downward-outline" fill={theme['color-basic-100']} style={{ height: 20, width: 20 }} />
                  : <Icon name="arrow-ios-upward-outline" fill={theme['color-basic-100']} style={{ height: 20, width: 20 }} />
              }
            </TouchableOpacity>
            */}

            <MotiView
              animate={{ height: (etape === 0 && montantShow ? 70 : 0) }}
              style={{ overflow: 'hidden' }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <TextInput name="amount" placeholder="Saisissez votre montant ici" />
            </MotiView>
            <MotiView animate={{ height: (revenuLoyer ? 120 : 0) }} style={{ overflow: 'hidden' }} transition={{ type: 'timing', duration: 500 }}>
              <TextInput name="amount" placeholder="Montant des charges" />
              <TextInput name="amount" placeholder="Taux de frais de gestion" />
            </MotiView>

            <MotiView
              animate={{
                height: (frequenceShow
                  ? 150 : 0),
              }}
              style={{
                overflow: 'hidden',
              }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <SelectComp name="frequency" data={frequence} onChangeValue={() => setDateDerniereEcheanceShow(true)} placeholder="Fréquence" size="large" appearance="default" status="primary" />

              <MotiView
                animate={{ maxHeight: (dateDerniereEcheanceShow ? 200 : 0) }}
                style={{
                  overflow: 'hidden',
                  flexDirection: 'row',
                  marginHorizontal: 23,
                  justifyContent: 'space-between',
                  height: 60,
                  alignItems: 'center',
                }}
                transition={{ type: 'timing', duration: 500 }}
              >
                <DatepickerComp name="nextDueDate" placeholder="Date de dernière échéance" />
              </MotiView>

            </MotiView>

            <MotiView
              animate={{ maxHeight: (revenuLoyer ? 400 : 0) }}
              style={{
                overflow: 'hidden',
              }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <Text category="h5">Ajouter un locataire</Text>
              <TextInput style={{ height: 80, paddingBottom: 15 }} name="tenants.firstname" placeholder="Saisissez le prénom" />
              <TextInput style={{ height: 80, paddingBottom: 15 }} name="tenants.lastname" placeholder="Saisissez le nom" />
              <TextInput style={{ height: 80, paddingBottom: 15 }} name="tenants.email" placeholder="Saisissez le mail" />
              <Text style={{ paddingBottom: 15 }} category="h5">Date de début de bail</Text>
              <DatepickerComp name="tenants.startDate" placeholder="Date de début de bail" style={{ height: 80, paddingBottom: 15 }} />
              <Text style={{ paddingBottom: 15 }} category="h5">Date de fin de bail</Text>
              <DatepickerComp name="tenants.endDate" placeholder="Date de fin de bail" style={{ paddingBottom: 15 }} />
            </MotiView>

            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <Button
                onPress={paramBudgetForm.handleSubmit((data) => validateBudget(data))}
                size="large"
              >
                Enregistrer
              </Button>
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
    backgroundColor: '#f6f6f6',
    marginTop: 12,
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
