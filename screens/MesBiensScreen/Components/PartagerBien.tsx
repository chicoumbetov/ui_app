import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Layout, Text,
} from '@ui-kitten/components';

import {
  Alert,
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import TextInputComp from '../../../components/Form/TextInput';
import SelectComp from '../../../components/Form/Select';
import Form from '../../../components/Form/Form';
import { useCreatePendingInvitationMutation } from '../../../src/API/PendingInvitation';
import { InvitationType } from '../../../src/API';
import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';

type ShareRealEstateForm = {
  email : string,
  type: InvitationType,
};

export const typeAcces = [
  {
    label: 'Administration',
    key: 'Admin',
  },
  {
    label: 'Lecture Seule',
    key: 'ReadOnly',
  },
];

const PartagerBien = () => {
  const route = useRoute<RouteProp<TabMesBiensParamList, 'partager-bien'>>();
  const shareRealEstateForm = useForm<ShareRealEstateForm>();

  const { bienget } = useGetRealEstate(route.params.id);

  const createPendingInvitation = useCreatePendingInvitationMutation();

  const addUser = async (data: ShareRealEstateForm) => {
    console.log(data);
    await createPendingInvitation.createPendingInvitation({
      variables: {
        input: {
          realEstateId: route.params.id,
          ...data,
        },
      },
    });

    Alert.alert(
      'Votre bien a été partagé avec succès !',
      '',
      [
        { text: 'Ok', onPress: () => {} },
      ],
      { cancelable: false },
    );
  };

  return (
    <View>

      {/**
      *  I part
      */}
      <Layout style={styles.container}>
        <Text category="h1" status="basic" style={{ marginBottom: 20 }}>
          Partager le bien
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <MaisonVert height={40} width={40} style={{ marginRight: 12 }} />
          <Text category="h4" status="basic">
            {bienget?.name}
          </Text>
        </View>
      </Layout>
      <Separator />

      {/**
       *  II. Ajouter un utilisateur
       */}
      <Form {...shareRealEstateForm}>
        <Layout style={styles.container}>
          <Text category="h2">
            Ajouter un utilisateur
          </Text>
          <View style={{ height: 70 }}>
            <TextInputComp
              name="email"
              placeholder="Saisissez le mail de l'utilisateur"
              style={{ marginVertical: 15 }}
            />
          </View>
          <View style={{ height: 70 }}>
            <SelectComp name="type" data={typeAcces} placeholder="Type d'accès" size="large" appearance="default" status="primary" />
          </View>
          <View style={styles.buttonRight}>
            <Button
              loading={createPendingInvitation.mutationLoading}
              loadingText="Chargement"
              onPress={shareRealEstateForm.handleSubmit((data) => { addUser(data); })}
              style={{ width: 150 }}
            >
              Valider
            </Button>
          </View>
        </Layout>
      </Form>
    </View>
  );
};

export default PartagerBien;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  buttonRight: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
