import React, { useEffect, useState } from 'react';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import Select from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';

type DeclarationImpotsForm = {
  bien: string;
  anneeEcheance: string;
};

const DeclarationImpots = () => {
  const navigation = useNavigation();
  const { data } = useRealEstateList();
  const [houseList, setHouseList] = useState<Array<{ label: string, key: string }>>([]);

  useEffect(() => {
    const selectHouse: Array<{ label: string, key: string }> = [];
    data?.listRealEstates?.items?.forEach((house) => {
      if (house) {
        selectHouse.push({ label: house.name, key: house.id });
      }
    });
    setHouseList(selectHouse);
  }, [data]);

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
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

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

        <Form<DeclarationImpotsForm> {...declarationImpotsForm}>
          <>
            <Select
              name="bien"
              data={houseList}
              placeholder="Choisissez le bien"
              size="large"
              appearance="default"
              status="primary"
            />
            <TextInput
              label="Année de l'écheance"
              name="anneeEcheance"
              placeholder="aaaa"
              icon="calendar-outline"
            />
          </>
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
