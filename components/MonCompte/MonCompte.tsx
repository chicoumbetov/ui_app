import React from 'react'
import {Text, View} from "react-native";

import {useFonts} from "expo-font";

const MonCompte = () => {

    const [loaded] = useFonts({
        'Houschka_Rounded_Alt_Light_Regular': require('../../assets/fonts/Houschka_Rounded_Alt_Light_Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View>
            <Text style={{ fontFamily: 'Houschka_Rounded_Alt_Light_Regular'}}>Mon Compte</Text>
            <Text style={{ fontFamily: 'Houschka_Rounded_Alt_Light_Regular'}}>Mathieu</Text>
            {/*avatar image*/}

        </View>
    )
}

export default MonCompte;
