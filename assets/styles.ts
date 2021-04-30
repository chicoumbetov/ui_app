import { StyleSheet } from 'react-native';
import {
  Colors, NumberMap, Spacing, Typographies,
} from './stylesTypes';

export const colors: Colors = {
  bleuFonc: '#083859',
  noir: '#04161b',
  bleu: '#0076c8',
  green: '#00c29a',
  vert2: '#36daa9',
  blanc: '#ffffff',
  rouge: '#ff5640',
  vert4: '#c9fcde',
  orange4: '#fef7cb',
  jaune: '#ffbe00',
  bleu2: '#37a3de',
  bleu3: '#5fc4ee',
  gris: '#b5b5b5',
  text: '#b5b5b5', // '#04161b',
  error: '#ff5640',
  background: '#f6f6f6',
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
    fontSize: 24,
    fontFamily: 'Houschka_Rounded_Alt_Light_Regular',
  },
  regularText: {
    fontSize: 16,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  caption: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Houschka_Rounded_Alt_Light_Regular',
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Houschka_Rounded_Alt_Light_Regular',
  },
  headline: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  subhead: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  title1: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  title2: {
    fontFamily: 'HouschkaRoundedDemiBold',
    fontSize: 15,
  },
  title4: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  title3: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 16,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  description: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  label: {
    fontSize: 16,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  input: {
    fontSize: 20,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  error: {
    fontFamily: 'HouschkaRoundedDemiBold',
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
