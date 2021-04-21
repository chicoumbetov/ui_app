import * as React from 'react';
// import { useEffect } from 'react';
import { Button, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import MaTresorerie from './Components/Tresorerie';

export default function TabMaTresorerieScreen() {
  // to ignore warning
  // useEffect(() => {
  // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);

  const onAjoutBien = () => {

  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Layout style={{ flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
        <MaTresorerie />
        <Button
          style={{ margin: 10 }}
          onPress={() => { onAjoutBien(); }}
        >
          Ajouter un nouveau bien
        </Button>
      </Layout>
    </ScrollView>

  );
}
