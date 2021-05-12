import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TextInputComp from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const ModifierInfo2 = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ModifierInfo3');
  };

  useEffect(() => {
    console.log('useEffect test of ModifierInfo 2');
  });

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
      <View>
        <Text category="h1" style={styles.title}>Modifier vos informations</Text>
      </View>

      <View style={{
        flexDirection: 'row', marginBottom: 20, alignItems: 'center',
      }}
      >
        <View style={{ marginRight: 20 }}>
          <Text category="p1">Votre date de naissance</Text>
        </View>

        <Layout style={{ flex: 1, backgroundColor: 'transparent' }}>
          <TextInputComp
            name="dateDeNaissance"
            placeholder="dd/mm/yyyy"
            icon="calendar-outline"
          />
        </Layout>
      </View>

      <TextInputComp
        name="adresse"
        placeholder="Adresse"
      />

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="adresseComplement"
          placeholder="Complément d'adresse"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="codePostal"
          placeholder="Code postale"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="ville"
          placeholder="Ville"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="pays"
          placeholder="Pays"
        />
      </Layout>

      <View style={styles.buttonRight}>
        <Button onPress={onPress} size="large" style={{ width: 139 }}>
          Valider
        </Button>
      </View>

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
