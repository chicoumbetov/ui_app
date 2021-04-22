import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button, Input, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const Informations = ({ route }) => {
  const [value, setValue] = React.useState('');
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ModifierInfo3');
  };
  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 17 }}>Votre date de naissance</Text>
        </View>

        <Input
          style={{ flex: 1, backgroundColor: 'transparent', fontWeight: 'normal' }}
          placeholder="Changer date"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </View>

      <Input
        style={styles.input}
        placeholder="Changer l'adresse"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={styles.input}
        placeholder="Changer l'adresse complément"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={styles.input}
        placeholder="Changer code postale"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={styles.input}
        placeholder="Changer ville"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={styles.input}
        placeholder="Changer pays"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <View style={styles.buttonRight}>
        <Button onPress={onPress} style={{ width: 150 }}>
          Valider
        </Button>
      </View>

    </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    marginTop: 12,
    marginBottom: 49,
    fontSize: 21,
    fontWeight: '300', // not working fix it
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  buttonRight: {
    alignItems: 'flex-end',
  },
  input: {
    backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 20,
  },
});

export default Informations;
