import {StyleSheet} from 'react-native';
import {Colors, Grays, Greens, NumberMap, Spacing, Typographies,} from './stylesTypes';

export const colors: Colors = {
    primary: '#37403B',
    secondary: '#E6F4EC',
    secondaryText: '#81A595',
    lightGray: '#dee0e0',
    gray: '#BABABA',
    darkGray: '#484848',
    text: '#484848',
    error: 'red',
    white: 'white',
    backgroundColor: '#F7F9F8',
    drawerBackground: '#FFFFFF',
    green: '#65C78F',
    orange: '#FFAB79',
    red: '#FF6666',
    transparent: 'transparent',
    lighterGray: '#F2F4F3',
    black: 'black',
    mediumDarkGray: '#484848',
};

export const gray: Grays = {
    gray1: '#F2F4F3',
    gray2: '#DEE0E0',
    gray3: '#BABABA',
    gray4: '#484848',
};

export const green: Greens = {
    green1: '#E6F4EC',
    green2: '#65C78F',
    green3: '#81A595',
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
