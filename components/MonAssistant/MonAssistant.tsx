import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

const MonAssistant = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Assitant</Text>
            <Text style={styles.subtitle}>Générer les documents</Text>
            <View style={styles.docs}>
                <Text style={styles.aideText}>Aide à la déclaration d'impôts</Text>
            </View>
            <View style={styles.docs}>
                <Text style={styles.quittanceText}>Quittance de loyer</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: "rgba(246, 246, 246, 0.5)"
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Houschka_Rounded_Alt_Light_Regular'
    },
    subtitle: {
        fontSize: 20,
        marginTop: 34,
        marginBottom: 26,
    },
    docs: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 30,
        shadowColor: "rgba(182, 182, 182, 0.5)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    aideText: {
        fontSize: 16,
    },
    quittanceText: {}
})

export default MonAssistant;
