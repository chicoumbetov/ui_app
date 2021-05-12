import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const MonAssistant = () => {
  const navigation = useNavigation();

  const onDeclarationImpots = () => {
    navigation.navigate('DeclarationImpots');
  };

  const onQuittanceLoyer = () => {
    navigation.navigate('QuittanceLoyer');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          backgroundColor: '#efefef',
        },
        showsVerticalScrollIndicator: false,
      }}
    >
      <Layout style={styles.container}>
        <Text category="h1" style={styles.title}>Mon Assistant</Text>
        <Text category="h2" style={styles.subtitle}>Générer les documents</Text>

        <TouchableOpacity onPress={onDeclarationImpots} style={styles.docs}>
          <Text category="h5" status="basic">Aide à la déclaration d'impôts</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 16, width: 16, marginRight: 5, alignItems: 'center',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onQuittanceLoyer} style={styles.docs}>
          <Text category="h5" status="basic">Quittance de loyer</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 16, width: 16, marginRight: 5, alignItems: 'center',
            }}
          />
        </TouchableOpacity>

      </Layout>
    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  container: {
    padding: 24,
    // marginVertical: 13,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    marginTop: 13,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 40,
    letterSpacing: 0.7,
    marginBottom: 39,
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 25,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 29,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: '#fff',
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
});

export default MonAssistant;
