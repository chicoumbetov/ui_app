import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Button, Layout, Radio, RadioGroup, Text,
} from '@ui-kitten/components';
// import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
// import Form from '../../../components/Form/Form';
import TextInput from '../../../components/Form/TextInput';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../../types';
import DatePicker from '../../../components/Form/DatePicker';

const MesRapportBien1 = () => {
  const navigation = useNavigation();
  // const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'mes-rapports-biens1'>>();
  // const bienDetail = useGetRealEstate(route.params.id);
  // console.log('bienDetail', route.params.id);
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const currentMonth = new Date().getMonth();
  // console.log(currentYear, previousYear, currentMonth);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const allerMesRapportsBien2 = () => {
    navigation.navigate('mes-rapports-biens2');
  };

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        padding: 22,
      },
    }}
    >
      <Text category="h1" status="basic">
        Mes rapports par bien
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        style={styles.containerRadio}
      >
        <Radio>
          <Text category="p1" status="basic">Année</Text>
        </Radio>
        <Radio>
          <Text category="p1">Année - 1</Text>
        </Radio>
        <Radio>
          <Text category="p1">Mois</Text>
        </Radio>
      </RadioGroup>

      <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
        <View style={{ marginRight: 15 }}>
          <Text category="h5">Selectionner l'année</Text>
        </View>

        <TextInput
          name="selectionnerAnnee"
          placeholder="dd/mm/yyyy"
          icon="calendar-outline"
        />
        <DatePicker name="start" />
      </Layout>

      <View style={styles.buttonRight}>
        <Button onPress={allerMesRapportsBien2} size="large" style={{ width: 173 }}>
          Valider
        </Button>
      </View>
    </MaxWidthContainer>
  );
};

export default MesRapportBien1;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  containerRadio: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  buttonRight: { marginTop: 20, alignItems: 'flex-end' },
});
