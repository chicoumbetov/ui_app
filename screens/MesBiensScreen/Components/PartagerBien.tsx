import React, { useEffect } from 'react';
import { useLinkTo, useRoute } from '@react-navigation/native';
import {
  Button, Layout, Spinner, Text,
} from '@ui-kitten/components';

import {
  Alert,
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInputComp from '../../../components/Form/TextInput';
import SelectComp from '../../../components/Form/Select';
import Form from '../../../components/Form/Form';
import { useCreatePendingInvitationMutation } from '../../../src/API/PendingInvitation';
import { InvitationType } from '../../../src/API';
import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import { sendEmail, sendTemplateEmail } from '../../../components/AwsMail/SendMail';

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
  const linkTo = useLinkTo();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'partager-bien'>>();
  const shareRealEstateForm = useForm<ShareRealEstateForm>();

  const { bienget } = useGetRealEstate(route.params.id);

  const createPendingInvitation = useCreatePendingInvitationMutation();

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

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

      {/**
       *  II. Ajouter un utilisateur
       */}
      <Form {...shareRealEstateForm}>
        <Layout style={styles.container}>
          <Text category="h2">
            Ajouter un utilisateur
          </Text>

          <TextInputComp
            name="email"
            placeholder="Saisissez le mail de l'utilisateur"
            style={{ marginVertical: 15 }}
          />
          <SelectComp name="type" data={typeAcces} placeholder="Type d'accès" size="large" appearance="default" status="primary" />

          <View style={styles.buttonRight}>
            <Button
              disabled={createPendingInvitation.mutationLoading}
              onPress={shareRealEstateForm.handleSubmit((data) => { addUser(data); })}
              style={{ width: 150 }}
              accessoryRight={createPendingInvitation.mutationLoading && LoadingIndicator}
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
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  buttonRight: {
    marginTop: 36,
    alignItems: 'flex-end',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
