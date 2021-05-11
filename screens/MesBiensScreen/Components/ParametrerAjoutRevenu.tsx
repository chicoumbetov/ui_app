import React, { useState } from 'react';
import {
  Button, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, View,
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

const ParametrerAjoutRevenu = () => {
  const theme = useTheme();
  const paramBudgetForm = useForm<ParamBudgetForm>();
  const paramAjoutBienForm = useForm<ParamAjoutBienForm>();

  const [frequenceShow, setFrequenceShow] = useState(false);
  const [montantShow, setMontantShow] = useState(false);
  const [dateDerniereEcheanceShow, setDateDerniereEcheanceShow] = useState(false);

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

              <Layout style={{ backgroundColor: 'transparent' }}>

                <Layout>
                  <SelectComp name="typeRevenu" data={typeRevenu} placeholder="Type De Revenu" size="large" appearance="default" status="primary" />

                </Layout>

                <Layout>
                  <SelectComp name="Loyer" data={montant} placeholder="Montant" onChangeValue={(v) => { if (v === 'b1') { setMontantShow(true); } }} size="large" appearance="default" status="primary" />

                </Layout>

                {montantShow
                  && (
                  <Layout>
                    <SelectComp name="typeMontant" data={typeMontant} placeholder="Type de Montant" size="large" onChangeValue={() => { setFrequenceShow(true); }} appearance="default" status="primary" />

                  </Layout>
                  )}
                {frequenceShow
                  && (
                  <>
                    <Layout style={{ backgroundColor: 'transparent' }}>
                      <SelectComp name="typeRevenu" data={frequence} placeholder="Fréquence" size="large" appearance="default" status="primary" />
                      <TextInputComp style={{ marginBottom: 30 }} name="adresse" placeholder="Adresse" />
                      <TextInputComp style={{ marginBottom: 30 }} name="complement" placeholder="Complément d'adresse" />
                      <TextInputComp style={{ marginBottom: 30 }} name="codePostal" placeholder="Code Postal" />
                      <TextInputComp style={{ marginBottom: 30 }} name="ville" placeholder="Ville" />
                      <TextInputComp name="pays" placeholder="Pays" />
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
});
