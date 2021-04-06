import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CompteHeader from "../../CompteHeader";
import {AntDesign} from "@expo/vector-icons";

import {CompteType} from "../../../types";

export type CompteProps = {
    compte: CompteType,
}

const OwnerCompte = ({compte}: CompteProps) => {

    const onPress = () => {
        console.warn('Button pressed')
    }

    return (
        <View>
            <View style={{marginTop: 20, padding: 20, borderRadius: 10,}}>

                <CompteHeader compte={compte}/>

                <View style={{
                    backgroundColor: '#fff',
                    marginTop: 15,
                    borderRadius: 10,
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowColor: '#b5b5b5'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        justifyContent: 'space-between',
                    }}>

                        <View>
                            <Text style={{color: '#222b45', fontSize: 16, fontWeight: '600'}}>Monsieur {compte.nom}
                                {compte.prenom}</Text>
                            <Text style={{color: '#b5b5b5'}}>FR{compte.IBAN}</Text>
                            <Text style={{color: '#b5b5b5'}}>{compte.bank}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{
                                backgroundColor: "#ffbe00",
                                marginHorizontal: 5,
                                height: 30,
                                width: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 5,
                                borderRadius: 30
                            }}>
                                <Text>3</Text>
                            </View>

                            <AntDesign name="right" size={24} color="#b5b5b5" onPress={onPress}/>
                        </View>

                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTextLeft}>Ajouter un compte</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                        <View>
                            <Text style={styles.buttonTextRight}>Supprimer un compte</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={styles.separator}/>
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

export default OwnerCompte;
