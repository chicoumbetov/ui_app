import * as React from 'react';
import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import {StyleProp, ViewStyle} from 'react-native';
import icoMoonConfig from './selection.json';
import {colors, fontSize} from '../../assets/styles';

export type IconName = 'grid-outline' | 'home-outline' | 'file-text-outline' | "menu-outline" | "trending-up-outline" | 'sous-plancher' | 'comble' | 'photo' | 'CSSR' | 'mur' | 'plus' | 'regle' | 'chevron-right' | 'az-bas' | 'az' | 'az-haut' | 'chevron' | 'close' | 'menu-contextuel' | 'cloud-sun' | 'sun-cloud-rain' | 'flake' | 'thunder' | 'cloud2' | 'cloud' | 'sun' | 'fog' | 'cloud-rain' | 'chantiers' | 'notifcations' | 'controle-de-qualite' | 'sav' | 'depots' | 'gestion-stock' | 'facturation' | 'Commercial' | 'planification' | 'gestion-utilisateur' | 'client' | 'lead' | 'dossiers' | 'check' | 'search' | 'menu' | 'warning' | 'arrow-left' | 'cross' | 'tick1' | 'grid' | 'flash' | 'camera' | 'reverse' | 'wb_sunny' | 'wb_iridescent' | 'wb_incandescent' | 'wb_auto' | 'wb_cloudy' | 'beach_access' | 'tick' | 'video' | 'video-camera' ;

export type IconProps = {
    name: IconName;
    primary?: boolean;
    secondary?: boolean;
    color?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

export const IcomoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Icons', 'icomoon.ttf');

export default function Icon(props: IconProps): JSX.Element {
    const {
        name, primary, secondary, color, size, style,
    } = props;
    let iconColor: string;
    if (primary) {
        iconColor = colors.primary;
    } else if (secondary) {
        iconColor = colors.secondary;
    } else if (color) {
        iconColor = color;
    } else {
        iconColor = colors.darkGray;
    }
    let iconSize: number = fontSize.text;
    if (size) {
        iconSize = size;
    }
    return <IcomoonIcon color={iconColor} size={iconSize} name={name as never} {...{ style }} />;
}
