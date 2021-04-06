import React from 'react'
import {View} from "react-native";
import CompteHeader from "../CompteHeader";
import {CompteType} from "../../types";

export type CompteProps = {
    compte: CompteType,
}

const MonCompte = ({compte}: CompteProps) => {
    return (
        <View>
            <CompteHeader compte={compte}/>
        </View>
    )
}

export default MonCompte;
