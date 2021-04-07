import React from "react"
import {SectionList, Text, View, StyleSheet, SafeAreaView, Image } from "react-native";

import OwnerCompte from './OwnerCompte/OwnerCompte';
import CompteFooter from "../CompteFooter";
import comptesData from "../../mockData/comptesData";

const ComptesBancaires = () => {
    //query
    //const comptes = query

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.compteHeader}>
                Comptes Bancaires
            </Text>
            {/* use SectionList to render several accounts with its types and details*/}
            <View style={styles.compteSection}>
                <SectionList
                    /*sections data must be array*/
                    sections={comptesData}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={{marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../assets/images/img.png')}
                                   style={{height: 40, width: 40, marginRight: 12}}/>
                            <Text style={{fontSize: 20, fontWeight: '600'}}> La maison de {title}</Text>
                        </View>
                    )}
                    renderItem={({item}) => <OwnerCompte compte={item}/>}
                    renderSectionFooter={() => (
                        <View style={styles.footer}>
                            <CompteFooter />
                        </View>

                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: 'rgba(246, 246, 246, 0.5)',
        padding: 26
    },
    compteSection: {
      paddingHorizontal: 26,
    },
    compteHeader: {
        fontSize: 24,
        padding: 26,
        fontWeight: '400'
    },
    footer: {
        paddingBottom: 29,
        borderBottomWidth: 0.5,
        borderBottomColor: '#b5b5b5'
    }
})

export default ComptesBancaires;


