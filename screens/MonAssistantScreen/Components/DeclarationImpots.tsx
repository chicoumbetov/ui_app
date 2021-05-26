import React, { useEffect } from 'react';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import TextInputComp from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';
import { IconName } from '../../../components/Icon/Icon';

type DeclarationImpotsForm = {
  key: number;
  label: string;
  section?: boolean;
  icon?: IconName;
  // to be as configurable as possible allow any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (row?: any) => void;
};
const selectHouse = [];

const DeclarationImpots = () => {
  const navigation = useNavigation();
  const { data } = useRealEstateList();

  /**
  function checkValue(house: string, selectForm) {
    const status = 'Not exist';

    for (let i = 0; i < selectForm.length; i += 1) {
      const name = selectForm[i];
      if (name !== house) {
        selectForm.push({ label: house?.name, key: house?.id });
        break;
      }
    }
    return status;
  }
  */

  data?.listRealEstates?.items?.forEach((house) => {
    /**
    for (let i = 0; i < selectHouse.length; i += 1) {
      if (house === selectHouse[i]) {
        return selectHouse;
      }
      selectHouse.push({ label: house?.name, key: house?.id });
    }
     */

    selectHouse.push({ label: house?.name, key: house?.id });
    // checkValue(house, selectForm);
  });

  console.log(selectHouse);
  /**
  const comptesData = [
    {
      label: 'La Maison de Matthieu',
      key: 'b1',
    },
    {
      label: 'L\'Appart de Matthieu',
      key: 'b2',
    },
  ];
 */

  const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const onDeclarationImpots2 = () => {
    navigation.navigate('DeclarationImpots2');
  };

  return (
    <MaxWidthContainer>

      <View style={styles.containerOut}>

        <Text
          category="h1"
          style={{
            marginTop: 19.7,
            marginBottom: 14,
          }}
        >
          Paramétrer mon aide à la déclaration d'impôts
        </Text>

        <Form <DeclarationImpotsForm> {...declarationImpotsForm}>
          <SelectComp
            name="bien"
            data={selectHouse}
            placeholder="Choisissez le bien"
            size="large"
            appearance="default"
            status="primary"
          />
          <TextInputComp
            label="Année de l'écheance"
            name="anneeEcheance"
            placeholder="aaaa"
            icon="calendar-outline"
          />
        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onDeclarationImpots2} size="large" style={{ width: 139 }}>
            Confirmer
          </Button>
        </View>

      </View>

    </MaxWidthContainer>
  );
};

export default DeclarationImpots;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    padding: 25,
    paddingRight: 21,
  },
  item: {
    borderBottomEndRadius: 20,
  },
  headerText: {
    marginTop: 2.8,
  },
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
});
