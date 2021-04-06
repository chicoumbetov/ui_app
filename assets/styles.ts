import {StyleSheet} from 'react-native';
import {Colors, NumberMap, Spacing,} from './stylesTypes';

export const colors: Colors = {
    bleuFonc: "#083859",
    noir: "#04161b",
    bleu: "#0076c8",
    vert: "#00c29a",
    vert2: "#36daa9",
    blanc: "#ffffff",
    rouge: "#ff5640",
    vert4: "#c9fcde",
    orange4: "#fef7cb",
    jaune: "#ffbe00",
    bleu2: "#37a3de",
    bleu3: "#5fc4ee",
    gris: "#b5b5b5",
    background: "rgba(246, 246, 246, 0)"
};

export const spacing: Spacing = {
    tiny: 2,
    smaller: 5,
    small: 7,
    base: 10,
    large: 18,
    xLarge: 35,
};

export const size: NumberMap = {
    headerHeight: 88,
    menuMiniWidth: 88,
    menuMaxWidth: 241,
    borderRadius: 10,
    drawerItemHeight: 40,
    bigFont: 40,
};

export const fontSize: NumberMap = {
    input: 16,
    smalltitle: 15,
    title: 20,
    medium: 32,
    xLarge: 60,
};
/*
export const typographies: Typographies = {
    body: {
        fontSize: 14,
        fontFamily: 'Overpass_400Regular',
        color: colors.darkGray,
    },
    callout: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: 'Overpass_600SemiBold',
    },
    caption: {
        fontSize: 11,
        lineHeight: 13,
        fontFamily: 'Overpass_400Regular',
    },
    footnote: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Overpass_400Regular',
        color: colors.darkGray,
    },
    headline: {
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Overpass_700Bold',
    },
    subhead: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'Overpass_700Bold',
    },
    title1: {
        fontSize: 15,
        lineHeight: 15,
        fontFamily: 'Overpass_700Bold',
    },
    title2: {
        fontFamily: 'Overpass_600SemiBold',
        fontSize: 15,
    },
    title4: {
        fontSize: 28,
        lineHeight: 34,
        fontFamily: 'Overpass_600SemiBold',
    },
    title3: {
        fontSize: 20,
        lineHeight: 26,
        fontFamily: 'Overpass_700Bold',
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 16,
        fontFamily: 'Overpass_400Regular',
    },
    description: {
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'Overpass_400Regular',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Overpass_700Bold',
        color: colors.text,
    },
    input: {
        fontSize: 20,
        fontFamily: 'Overpass_400Regular',
        color: colors.text,
    },
    error: {
        color: colors.error,
        fontFamily: 'Overpass_400Regular',
        fontSize: 14,
    },
};
*/
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
        backgroundColor: 'white',
        elevation: 1,
    },
});
