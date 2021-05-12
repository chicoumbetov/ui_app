import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/Form/TextInput';
import { Utilisateur } from '../../src/models';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { TabMonCompteParamList } from '../../types';
import Form from '../../components/Form/Form';

type ModifierInfo2Form = {
  adresse:string;
  complementAdresse: string;
  codePostal: string;
  ville: string;
  pays: string;
  dateNaissance: string;
};

const ModifierInfo2 = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMonCompteParamList, 'ModifierInfo2'>>();

  const modifierInfo2Form = useForm<ModifierInfo2Form>();

  const onPress = async (data: ModifierInfo2Form) => {
    const authUser = await Auth.currentAuthenticatedUser();

    const { dateNaissance, ...adresseProps } = data;

    await DataStore.save(new Utilisateur({
      userID: authUser.username,
      email: authUser.attributes.email,
      nom: authUser.attributes.family_name,
      prenom: authUser.attributes.given_name,
      numeroTel: authUser.attributes.phone_number,
      dateNaissance,
      adresse: adresseProps,
    }));

    navigation.navigate('ModifierInfo3');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{ style: styles.container }}
    >
      <Form<ModifierInfo2Form> {...modifierInfo2Form}>
        <>
          <View>
            <Text category="h1" style={styles.title}>{route.params?.signUp ? 'Finalisez votre inscription' : 'Modifier vos informations'}</Text>
          </View>

          <View style={{
            flexDirection: 'row', marginBottom: 20, alignItems: 'center',
          }}
          >
            <View style={{ marginRight: 20 }}>
              <Text category="p1">Votre date de naissance</Text>
            </View>

            <Layout style={{ flex: 1, backgroundColor: 'transparent' }}>
              <TextInput
                name="dateNaissance"
                placeholder="dd/mm/yyyy"
                icon="calendar-outline"
              />
            </Layout>
          </View>

          <TextInput
            name="adresse"
            placeholder="Adresse"
          />

          <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
            <TextInput
              name="complementAdresse"
              placeholder="Complément d'adresse"
            />
          </Layout>

          <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
            <TextInput
              name="codePostal"
              placeholder="Code postale"
            />
          </Layout>

          <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
            <TextInput
              name="ville"
              placeholder="Ville"
            />
          </Layout>

          <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
            <TextInput
              name="pays"
              placeholder="Pays"
            />
          </Layout>

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo2Form.handleSubmit((data) => onPress(data))} size="large" style={{ width: 139 }}>
              Valider
            </Button>
          </View>
          {/* <Modal visible style={{ overflow: 'hidden', alignItems: 'center', margin: 0 }}>
        <Camera
          onClose={() => {}}
          onChoose={() => {}}
          withPreview
        />
      </Modal> */}
        </>
      </Form>

    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 21,
    backgroundColor: 'transparent',
  },
  buttonRight: { alignItems: 'flex-end', marginTop: 34 },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default ModifierInfo2;
