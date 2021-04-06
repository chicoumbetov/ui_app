import React from 'react'
import {Text, View} from "react-native";
import OwnerCompte from "./OwnerCompte/OwnerCompte";

const ComptesBancaires = () => {

    return (
        <View style={{marginTop: 10, backgroundColor: 'rgba(246, 246, 246, 0.5)', padding: 26}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
                Comptes Bancaires
            </Text>
            {/* use FlatList to render several accounts with its types and details*/}

            <OwnerCompte/>
            <OwnerCompte/>


        </View>

    )
}

export default ComptesBancaires;


