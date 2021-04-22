export interface StringMap {
  [name: string]: string;
}

export interface NumberMap {
  [name: string]: number;
}

export type Typography = {
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
  color?: string;
};

export type Typographies = {
  body: Typography;
  regularText: Typography;
  caption: Typography;
  footnote: Typography;
  headline: Typography;
  subhead: Typography;
  title1: Typography;
  title2: Typography;
  title3: Typography;
  title4: Typography;
  subtitle: Typography;
  description: Typography;
  label: Typography;
  error: Typography;
  input: Typography;
};

export type Spacing = {
  tiny: number;
  small: number;
  smaller: number;
  base: number;
  large: number;
  xLarge: number;
};

export type Colors = {
  bleuFonc: string,
  noir: string,
  bleu: string,
  green: string,
  vert2: string,
  blanc: string,
  rouge: string,
  vert4: string,
  orange4: string,
  jaune: string,
  bleu2: string,
  bleu3: string,
  gris: string,
  text: string,
  error: string,
  background: string
};
