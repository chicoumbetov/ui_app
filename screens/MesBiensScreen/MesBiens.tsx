/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLinkTo } from '@react-navigation/native';
import MonBien from './Components/MonBien';

function MesBiens() {
  const linkTo = useLinkTo();

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#efefef', marginTop: 12 }}
    >
      <Layout style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 26 }}>
        <Text
          category="h1"
          style={{
            marginBottom: 20,
          }}
        >
          Mes Biens
        </Text>

        <MonBien />
        <MonBien />

      </Layout>

      <Button
        size="large"
        onPress={() => { onAjoutBien(); }}
        style={{ marginVertical: 10 }}
      >
        Ajouter un nouveau bien
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default MesBiens;
