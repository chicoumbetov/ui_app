import React from 'react';
import {
  StyleSheet, View, Platform,
} from 'react-native';

import { Text } from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Form from '../../components/Form/Form';
import Checkbox from '../../components/Form/Checkbox';
import Button from '../../components/Button';
import { useUser } from '../../src/API/UserContext';
import { NotificationParamsInput } from '../../src/API';

const paramsList = [
  { key: 'echeanceFacture', title: 'Prochaine échéance d\'une charge' },
  { key: 'loyer', title: 'Probable entrée du loyer d\'un de vos biens' },
  { key: 'debitBancaire', title: 'Débit bancaire sur un de vos comptes' },
  { key: 'creditBancaire', title: 'Crédit bancaire sur un de vos comptes' },
  { key: 'soldeNegatif', title: 'Solde négatif d\'un de vos comptes' },
  { key: 'retardLoyer', title: 'Loyer en retard de paiement sur un de vos biens' },
  { key: 'mauvaiseRenta', title: 'Rentabilité en baisse' },
  { key: 'autre', title: 'Autres notifications' },
];

type NotificationsParamsFrom = {
  privateProfile?: {
    notificationParams?: NotificationParamsInput
  }
};

const NotificationsParamsScreen = () => {
  const notificationParamsForm = useForm<NotificationsParamsFrom>();
  const navigation = useNavigation();
  const route = useRoute();
  const { updateUser, user } = useUser();

  const onPress = async (data: NotificationsParamsFrom) => {
    if (updateUser) {
      await updateUser(data);

      navigation.dispatch({
        ...StackActions.pop(),
        source: route.key,
      });
    }
  };

  return (
    <MaxWidthContainer
      outerViewProps={{
        style: {
          padding: 25,
        },
      }}
      innerViewProps={{
        style: { flex: 1, marginBottom: 50 },
      }}
    >
      <Text category="h1" style={styles.faq}>Paramètres des notifications</Text>
      <View style={styles.row}>
        <View style={styles.titleContainer} />
        <View style={styles.checkboxContainer}>
          <Text category="c1" style={{ textAlign: 'center' }}>
            Notification Push
          </Text>
        </View>
        <View style={styles.checkboxContainer}><Text category="c1">Email</Text></View>
      </View>
      <Form
        {...notificationParamsForm}
        defaultValues={user}
      >
        <>
          {paramsList.map((item) => (
            <View style={styles.row} key={item.key}>
              <View style={styles.titleContainer}><Text category="c1">{item.title}</Text></View>
              <View style={styles.checkboxContainer}>
                <Checkbox name={`privateProfile.notificationParams.${item.key}.push`} />
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox name={`privateProfile.notificationParams.${item.key}.email`} />
              </View>
            </View>
          ))}
        </>
        <Button onPress={notificationParamsForm.handleSubmit((data) => onPress(data))}>Enregistrer</Button>
      </Form>
    </MaxWidthContainer>
  );
};

export default NotificationsParamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 34,
  },
  faq: {
    marginTop: 12,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  titleContainer: {
    flex: 1,
  },
  checkboxContainer: {
    width: 90,
    paddingVertical: 25,
    alignItems: 'center',
    textAlign: 'center',
  },
  headerDown: {
    padding: 18,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#37a3de',
  },
});
