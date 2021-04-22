import React from 'react';
import {
  StyleSheet, TextInput, TouchableOpacity, View,
} from 'react-native';
import {
  Button, Input, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const Informations = ({ route }) => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');

  const onPress = () => {
    navigation.navigate('ModifierInfo2');
  };
  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>

      <Input
        style={{ backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 10 }}
        placeholder="Changer prènom"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={{ backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 10 }}
        placeholder="Changer nom"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={{ backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 10 }}
        placeholder="Changer email"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={{ backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 10 }}
        placeholder="Changer mot de Passe"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Input
        style={{ backgroundColor: 'transparent', fontWeight: 'normal', marginBottom: 10 }}
        placeholder="Changer numéro télephone"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />

      <Button onPress={onPress} style={{ margin: 20 }}>
        Valider
      </Button>

    </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
});

export default Informations;
