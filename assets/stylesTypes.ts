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
    callout: Typography;
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
    primary: string;
    secondary: string;
    secondaryText: string;
    lightGray: string;
    gray: string;
    darkGray: string;
    text: string;
    error: string;
    white: 'white';
    backgroundColor: string;
    drawerBackground: string;
    green: string;
    orange: string;
    red: string;
    transparent: 'transparent';
    lighterGray: string;
    black: string;
    mediumDarkGray: string;
};

export type Grays = {
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
};

export type Greens = {
    green1: string;
    green2: string;
    green3: string;
};
