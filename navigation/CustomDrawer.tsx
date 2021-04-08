import React from 'react';
import { View, Button } from 'react-native';

const CustomDrawer = ({ navigation }) => (
  <View style={styles.container}>
    <Button
      title="Tab Mes Biens"
      onPress={() => navigation.navigate('Tab Mes Biens')}
    />
    <Button
      title="Tab Mes Charges"
      onPress={() => navigation.navigate('Tab Mes Charges')}
    />
    <Button title="Tableau de bord" onPress={() => navigation.navigate('Tableau de bord')} />
    <Button title="Mon Assistant" onPress={() => navigation.navigate('Mon Assistant')} />
    <Button title="Notifications" onPress={() => navigation.navigate('Notifications')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

export default CustomDrawer;
