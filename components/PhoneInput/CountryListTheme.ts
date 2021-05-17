// eslint-disable-next-line import/no-extraneous-dependencies
import { createTheming } from '@callstack/react-theme-provider';

export const CUSTOM_THEME = {
  primaryColor: '#ccc',
  primaryColorVariant: '#eee',
  backgroundColor: '#ffffff',
  onBackgroundTextColor: '#000000',
  fontSize: 16,
  fontFamily: 'HouschkaRoundedMedium',
  filterPlaceholderTextColor: '#aaa',
  activeOpacity: 0.7,
  itemHeight: 51,
  flagSize: 30,
  flagSizeButton: 30,
};
export type Theme = Partial<typeof CUSTOM_THEME>;

const { ThemeProvider, useTheme } = createTheming<Theme>(CUSTOM_THEME);

export { ThemeProvider, useTheme };
