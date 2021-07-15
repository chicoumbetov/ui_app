import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';

const MonAssistant = () => {
  const linkTo = useLinkTo();

  const onDeclarationImpots = () => {
    linkTo('/mon-assistant/declaration-impots');
  };

  const onQuittanceLoyer = () => {
    linkTo('/mon-assistant/quittance-loyer');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.container}>
        <Text category="h1" style={styles.title}>Mon Assistant</Text>
        <Text category="h2" style={styles.subtitle}>Générez les documents</Text>

        <Card onPress={onDeclarationImpots} style={styles.docs}>
          <Text category="h5" status="basic">Aide à la déclaration d'impôts</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 16, width: 16, marginRight: 5, alignItems: 'center',
            }}
          />
        </Card>

        <Card onPress={onQuittanceLoyer} style={styles.docs}>
          <Text category="h5" status="basic">Quittance de loyer</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 16, width: 16, marginRight: 5, alignItems: 'center',
            }}
          />
        </Card>

      </View>
    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    marginBottom: 29,
  },
});

export default MonAssistant;
