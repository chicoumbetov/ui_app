import React from 'react';

import { SvgCss, XmlProps } from '@cantoo/rn-svg';
import MaisonVerteSvg from './Omedom_Icons_svg/Logement/maison_verte.svg';

type SvgCssSimpleType = Omit<XmlProps, 'xml'>;

export const MaisonVerte = (props: SvgCssSimpleType) => <SvgCss {...props} xml={MaisonVerteSvg} />;
