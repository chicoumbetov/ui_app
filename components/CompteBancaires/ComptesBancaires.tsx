import React from "react"
import {SectionList, Text, View, StyleSheet, SafeAreaView, Image, FlatList} from "react-native";

import comptes from '../../mockData/comptes';
import OwnerCompte from './OwnerCompte/OwnerCompte';
import CompteFooter from "../CompteFooter";
import CompteHeader from "../CompteHeader";

const ComptesBancaires = () => {
    //query
    //const comptes = query

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.compteHeader}>
                Comptes Bancaires
            </Text>

            {/* use FlatList to render several accounts with its types and details*/}
            <FlatList
                data={comptes}
                renderItem={({item}) => <OwnerCompte compte={item}/>}
                keyExtractor={(item) => item.id}
            />

            <SectionList
                /*sections data must be array*/
                sections={comptes}
                renderSectionHeader={({ section }) => (
                    <View style={{marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/images/img.png')} style={{height: 40, width: 40, marginRight: 12}}/>
                        <Text style={{fontSize: 20, fontWeight: '600'}}> La maison de {section.prenom}</Text>
                    </View>
                )}
                renderItem={({item}) => <OwnerCompte compte={item}/>}
                renderSectionFooter ={() => (
                    <CompteFooter/>
                )}
                keyExtractor={(item) => item.id}
            />

        </SafeAreaView>

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


