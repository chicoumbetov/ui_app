import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, CalendarViewModes, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { TabMonCompteParamList } from '../../types';
import Form from '../../components/Form/Form';
import DatePicker from '../../components/Form/DatePicker';
import { AvailableValidationRules } from '../../components/Form/validation';
import { useUser } from '../../src/API/UserContext';

type ModifierInfo2Form = {
  address: {
    address:string;
    additionalAddress?: string | null;
    postalCode: string;
    city: string;
    country: string;
  };
  birthDate: string;
};

const ModifierInfo2 = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMonCompteParamList, 'modifier-info-2'>>();
  const { createUser, updateUser, user } = useUser();

  const modifierInfo2Form = useForm<ModifierInfo2Form>();
  const onPress = async (data: ModifierInfo2Form) => {
    if (route.params?.signUp) {
      if (createUser) {
        await createUser(data);

        navigation.navigate('modifier-info-3', {
          signUp: true,
        });
      }
    } else if (updateUser) {
      await updateUser(data);

      navigation.navigate('modifier-info-3');
    }
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          flex: 1,
          backgroundColor: '#efefef',
        },
        showsVerticalScrollIndicator: false,
      }}
      innerViewProps={{
        style: {
          paddingHorizontal: 24,
          paddingVertical: 34,
        },
      }}
    >
      <Form<ModifierInfo2Form>
        {...modifierInfo2Form}
        defaultValues={user}
      >
        <>
          <View>
            <Text category="h1" style={styles.title}>{route.params?.signUp ? 'Finalisez votre inscription' : 'Modifier vos informations'}</Text>
          </View>

          <DatePicker
            name="birthDate"
            placeholder="dd/mm/yyyy"
            label="Votre date de naissance"
            labelBefore
            icon="calendar-outline"
            startView={CalendarViewModes.YEAR}
          />

          <TextInput
            name="address.address"
            placeholder="Adresse"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="address.additionalAddress"
            placeholder="Complément d'adresse"
            containerStyle={{ marginTop: 20 }}
          />

          <TextInput
            name="address.postalCode"
            placeholder="Code postal"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="address.city"
            placeholder="Ville"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="address.country"
            placeholder="Pays"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo2Form.handleSubmit((data) => onPress(data))} size="large" style={{ width: 139 }}>
              Valider
            </Button>
          </View>
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
