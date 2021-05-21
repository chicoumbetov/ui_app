import React, { useState } from 'react';
import {
  Button, Datepicker, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';

import { useForm } from 'react-hook-form';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';

import SelectComp from '../../../components/Form/Select';
import {
  frequence, typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { Frequency } from '../../../src/API';
import DatepickerComp from '../../../components/Form/DatePicker';
import TextInput from '../../../components/Form/TextInput';
import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

type ParamBudgetForm = {
  category: string,
  amount?: number | null,
  frequency?: Frequency,
  nextDueDate?: string | null,
};

const ParametrerAjoutRevenu = () => {
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

  const validateBudget = async (data: ParamBudgetForm) => {
    console.log('ParametrerAjoutRevenu data:', data);
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          backgroundColor: '#efefef',
        },
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
           *  Mode de détention
           */}

            <View>

              <Layout style={{ backgroundColor: 'transparent', paddingBottom: 33 }}>

                <SelectComp
                  name="category"
                  data={typeRevenu}
                  onChangeValue={(v) => { if (v === 'rent') { setRevenuLoyer(true); } else { setRevenuLoyer(false); } setMontantShow(true); setFrequenceShow(true); }}
                  placeholder="Type De Revenu"
                  size="large"
                  appearance="default"
                  status="primary"
                />

                {montantShow ? (
                  <View>
                    <TextInput name="amount" placeholder="Saisissez votre montant ici" />

                    {revenuLoyer ? (
                      <View>
                        <TextInput name="charges" placeholder="Montant des charges" />
                        <TextInput name="gestion" placeholder="Taux de frais de gestion" />
                      </View>
                    ) : <></>}
                  </View>
                ) : <></>}

                {frequenceShow
                  ? (
                    <Layout style={{ backgroundColor: 'transparent' }}>
                      <SelectComp name="frequency" data={frequence} onChangeValue={() => setDateDerniereEcheanceShow(true)} placeholder="Fréquence" size="large" appearance="default" status="primary" />
                      {dateDerniereEcheanceShow ? (
                        <DatepickerComp name="nextDueDate" placeholder="Date de dernière échéance" />
                      ) : <></>}
                    </Layout>
                  ) : <></>}

              </Layout>

              {revenuLoyer ? (
                <View>
                  <Text style={{ paddingBottom: 30 }} category="h5">Ajouter un locataire</Text>
                  <TextInput style={{ paddingBottom: 30 }} name="firstname" placeholder="Saisissez le prénom" />
                  <TextInput style={{ paddingBottom: 30 }} name="lastname" placeholder="Saisissez le nom" />
                  <TextInput style={{ paddingBottom: 30 }} name="email" placeholder="Saisissez le mail" />
                  <Text style={{ paddingBottom: 30 }} category="h5">Date de début de bail</Text>
                  <Datepicker style={{ paddingBottom: 30 }} />
                  <Text style={{ paddingBottom: 30 }} category="h5">Date de fin de bail</Text>
                  <Datepicker style={{ paddingBottom: 30 }} />
                </View>
              ) : <></>}

            </View>

            <Layout style={{ marginBottom: 10 }}>
              <Button
                onPress={paramBudgetForm.handleSubmit((data) => validateBudget(data))}
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
