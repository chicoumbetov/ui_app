import * as React from 'react';
// import { useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

function CreationBien() {
  // to ignore warning
  // useEffect(() => {
  // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Layout style={{ flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
        <Text>Création de votre bien</Text>
      </Layout>
    </ScrollView>

  );
}

export default CreationBien;
