import React, { useEffect, useState } from 'react';
import { ApolloClientOffline } from '@wora/apollo-offline/lib/ApolloClientOffline';
import { useApolloClient } from 'react-apollo';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
import ActivityIndicator from '../../components/ActivityIndicator';

const Rehydration = ({ children }: { children: React.ReactNode }) => {
  const client = useApolloClient();
  const [rehydrated, setRehydrated] = useState(
    client instanceof ApolloClientOffline
      ? client.isRehydrated()
      : false,
  );

  useEffect(() => {
    if (client instanceof ApolloClientOffline && !client.isRehydrated()) {
      client.hydrate().then(() => setRehydrated(true));
    }
  }, [client]);
  return rehydrated ? <>{children}</> : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h4" status="primary">Chargement des données</Text>
      <ActivityIndicator />
    </View>
  );
};

export default Rehydration;
