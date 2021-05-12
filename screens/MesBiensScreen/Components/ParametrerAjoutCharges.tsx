import React, { useState } from 'react';
import {
  Button, Datepicker, Icon, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

import SelectComp from '../../../components/Form/Select';
import {
  loyer, frequence, typeRevenu, typeMontant, montant,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';
import TextInputComp from '../../../components/Form/TextInput';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

type ParamBudgetForm = {
  typeRevenu: string;
  montant: string;
  frequence: string;
  derniereEcheance: string;
  typemontant: string;
};

const initialFormState = {
  typeRevenu: 'Type de Revenu',
  montant: 'Montant',
  frequence: 'Fréquence',
  typeImpo: 'Type d\'imposition',
  typeDetention: 'Type de détention',
};

type ParamAjoutBienForm = {
  bien: string;
  anneeEcheance: string;
};

const ParametrerAjoutCharges = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();
  const paramAjoutBienForm = useForm<ParamAjoutBienForm>();

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
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      {/**
         *  I. Mon Budget
         */}
      <Layout style={styles.container}>
        <Text category="h1">
          Paramétrer votre budget
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <View style={{ marginRight: 12 }}>
            <MaisonVert height={40} width={40} />
          </View>

          <Text category="h3">
            {' '}
            {/* {compte.typeRevenu} */}
            La Maison
            {' '}
            de Mathieu
            {' '}
          </Text>
        </View>
      </Layout>

      {/**
         *  II. Ajouter revenu
         */}
      <Layout style={styles.container}>
        <Text category="s2" status="basic">
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
                  <SelectComp name="typeRevenu" data={typeRevenu} onChangeValue={(v) => { if (v === 'b1') { setRevenuLoyer(true); } else { setRevenuLoyer(false); } setMontantShow(true); setFrequenceShow(true); }} placeholder="Type De Revenu" size="large" appearance="default" status="primary" />

                </View>

                <View>

                  {montantShow && (
                    <View>
                      <TextInputComp name="montant" placeholder="Saisissez votre montant ici" />

                      {revenuLoyer && (
                      <View>
                        <TextInputComp name="charges" placeholder="Montant des charges" />
                        <TextInputComp name="gestion" placeholder="Taux de frais de gestion" />
                      </View>
                      )}
                    </View>
                  )}

                </View>
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

              {revenuLoyer && (
                <View>
                  <Text style={{ paddingBottom: 30 }} category="h5">Ajouter un locataire</Text>
                  <TextInputComp style={{ paddingBottom: 30 }} name="charges" placeholder="Montant des charges" />
                  <TextInputComp style={{ paddingBottom: 30 }} name="charges" placeholder="Montant des charges" />
                  <TextInputComp style={{ paddingBottom: 30 }} name="charges" placeholder="Montant des charges" />
                  <Text style={{ paddingBottom: 30 }} category="h5">Date de début de bail</Text>
                  <Datepicker style={{ paddingBottom: 30 }} />
                  <Text style={{ paddingBottom: 30 }} category="h5">Date de fin de bail</Text>
                  <Datepicker style={{ paddingBottom: 30 }} />
                </View>
              )}

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
