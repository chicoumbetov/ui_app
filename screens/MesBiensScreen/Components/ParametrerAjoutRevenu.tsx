import React, { useState } from 'react';
import {
  Button, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

import SelectComp from '../../../components/Form/Select';
import {
  loyer, frequence, typeRevenu, typeMontant,
} from '../../../mockData/ajoutRevenuData';
import Form from '../../../components/Form/Form';

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

const ParametrerAjoutRevenu = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef' }}
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

              <Layout style={{ backgroundColor: 'transparent' }}>

                <Layout>
                  <SelectComp name="typeRevenu" data={typeRevenu} placeholder="Type De Revenu" size="large" appearance="default" status="primary" />

                </Layout>

                <Layout>
                  <SelectComp name="Loyer" data={loyer} placeholder="Détention" onChangeValue={(v) => { if (v === 'b1') { setMontantShow(true); } }} size="large" appearance="default" status="primary" />

                </Layout>

                {montantShow
                  && (
                  <Layout>
                    <SelectComp name="typeMontant" data={typeMontant} placeholder="Montant" size="large" onChangeValue={() => { setFrequenceShow(true); }} appearance="default" status="primary" />

                  </Layout>
                  )}
                {frequenceShow
                  && (
                  <>
                    <Layout>
                      <SelectComp name="typeRevenu" data={frequence} placeholder="Fréquence" size="large" appearance="default" status="primary" />

                    </Layout>
                  </>
                  )}

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
    </KeyboardAwareScrollView>
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
});
