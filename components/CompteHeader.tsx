import React from 'react'
import {Image, Text, View} from "react-native";

const CompteHeader = () => {
    return (
        <View style={{marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../assets/images/img.png')} style={{height: 40, width: 40, marginRight: 12}}/>
            <Text style={{fontSize: 20, fontWeight: '600'}}> La Maison de Mathieu</Text>
        </View>
    )
}

export default CompteHeader;
