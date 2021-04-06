import React from "react"
import {FlatList, StyleSheet, Text, View} from "react-native";

import comptes from '../../mockData/comptes';
import OwnerCompte from './OwnerCompte/OwnerCompte';

const ComptesBancaires = () => {
    //query
    //const comptes = query

    return (
        <View style={styles.container}>
            <Text style={styles.compteHeader}>
                Comptes Bancaires
            </Text>

            {/* use FlatList to render several accounts with its types and details*/}
            <FlatList
                data={comptes}
                renderItem={({item}) => <OwnerCompte compte={item}/>}
                keyExtractor={(item) => item.id}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: 'rgba(246, 246, 246, 0.5)',
        padding: 26
    },
    compteHeader: {
        fontSize: 20,
        fontWeight: '500'
    },
})

export default ComptesBancaires;


