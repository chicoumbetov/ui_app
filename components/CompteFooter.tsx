import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const CompteFooter = () => {

    const onPress = () => {
        console.warn('Button pressed')
    }

    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonTextLeft}>Ajouter un compte</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonTextRight}>Supprimer un compte</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'},
    buttonTextLeft: {
        color: '#0076c8',
        fontSize: 13,
        fontWeight: '600',
    },
    buttonTextRight: {
        fontSize: 13,
        fontWeight: '600',
    },
    separator: {borderBottomWidth: 1, borderBottomColor: '#b5b5b5'},

})

export default CompteFooter;
