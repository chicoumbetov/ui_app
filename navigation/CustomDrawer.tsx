import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {useNavigation, CommonActions} from '@react-navigation/native';
import * as rootNavigator from '../components/rootNavigator';

const CustomDrawer = () => {
    return (
        <View style={styles.container}>
            <Button
                title="My Account"
                onPress={() => rootNavigator.navigate('MyAccount')}
            />
            <Button
                title="Contact"
                onPress={() => rootNavigator.navigate('Contact')}
            />
            <Button title="Cart" onPress={() => rootNavigator.navigate('Cart')} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
});
export default CustomDrawer;
