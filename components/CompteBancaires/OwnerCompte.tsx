import React from 'react'
import {Text, Image, View, Button} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const OwnerCompte = () => {
    return (
        <View style={{ marginTop: 20, backgroundColor: '#dcdcdc' }}>
            <Text style={{ fontSize: 22 }}>
                CompteBancaires
            </Text>
            <View style={{ backgroundColor: '#fff', marginTop: 20, padding: 20, borderRadius: 10, }} >

                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/img.png')}/>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}> La Maison de Mathieu</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, borderWidth: 2, padding: 20, borderRadius: 10}}>

                        <View>
                            <Text>Monsieur DUPONT Mathieu</Text>
                            <Text style={{color: 'grey'}}>FR76***************583</Text>
                            <Text style={{color: 'grey'}}>Societe generale</Text>
                        </View>

                        <View style={{ backgroundColor: "orange", marginHorizontal: 5, height: 30, width: 30, alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 30}}>
                            <Text >3</Text>
                        </View>

                        <AntDesign name="right" size={24} color="grey" />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Button title="Ajouter un compte" onPress={() => {}}/>
                    <Button title="Supprimer un compte" color="black" onPress={() => {}}/>
                </View>

            </View>

        </View>

    )
}

export default OwnerCompte;