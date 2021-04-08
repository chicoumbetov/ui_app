import React from 'react';
import { View, Button } from 'react-native';

const CustomDrawer = () => (
  <View style={styles.container}>
    <Button
      title="Tab Mes Biens"
      onPress={() => CustomDrawer.navigate('Tab Mes Biens')}
    />
    <Button
      title="Tab Mes Charges"
      onPress={() => CustomDrawer.navigate('Tab Mes Charges')}
    />
    <Button title="Tableau de bord" onPress={() => CustomDrawer.navigate('Tableau de bord')} />
    <Button title="Mon Assistant" onPress={() => CustomDrawer.navigate('Mon Assistant')} />
    <Button title="Notifications" onPress={() => CustomDrawer.navigate('Notifications')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

export default CustomDrawer;
