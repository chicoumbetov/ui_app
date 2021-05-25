import React, { useEffect } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const ModifierAbonnement = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('modifier-info-2');
  };

  useEffect(() => {
    console.log('useEffect test of ModifierInfo 1');
  });

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
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
        <Text category="h1" style={styles.title}>Modifier vos abonnements</Text>
      </View>

      <TextInput
        name="prenom"
        placeholder="Prénom"
      />

      <TextInput
        name="nom"
        placeholder="Changer nom"

      />

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

export default ModifierAbonnement;
