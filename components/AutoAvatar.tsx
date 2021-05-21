/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  ImageStyle,
} from 'react-native';

import { RequireSome } from '../utils/typeHelpers';
import S3Image from './S3Image';
import Image from './Image';

import ManAvatar from '../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import WomanAvatar from '../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';
import Immeuble from '../assets/Omedom_Icons_svg/Logement/immeuble.svg';
import MaisonVerte from '../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Cabane from '../assets/Omedom_Icons_svg/Logement/cabane.svg';
import Bateau from '../assets/Omedom_Icons_svg/Logement/bateau.svg';
import Boutique from '../assets/Omedom_Icons_svg/Logement/boutique.svg';
import Chateau from '../assets/Omedom_Icons_svg/Logement/chateau.svg';
import Manoir from '../assets/Omedom_Icons_svg/Logement/manoir.svg';
import MaisonBleu from '../assets/Omedom_Icons_svg/Logement/maison_bleu.svg';
import Riad from '../assets/Omedom_Icons_svg/Logement/riad.svg';
import Voiture from '../assets/Omedom_Icons_svg/Logement/voiture.svg';

export type AutoAvatarProps = {
  avatarInfo: string
  style: RequireSome<ImageStyle, 'height' | 'width'>;
};

export default function AutoAvatar(props: AutoAvatarProps): JSX.Element {
  const {
    avatarInfo,
    style,
  } = props;

  if (avatarInfo.indexOf('default::') > -1) {
    let SelectedAvatar = ManAvatar;
    switch (avatarInfo) {
      case 'default::ManAvatar':
        SelectedAvatar = ManAvatar;
        break;
      case 'default::WomanAvatar':
        SelectedAvatar = WomanAvatar;
        break;
      case 'default::Immeuble':
        SelectedAvatar = Immeuble;
        break;
      case 'default::MaisonVerte':
        SelectedAvatar = MaisonVerte;
        break;
      case 'default::Cabane':
        SelectedAvatar = Cabane;
        break;
      case 'default::Bateau':
        SelectedAvatar = Bateau;
        break;
      case 'default::Boutique':
        SelectedAvatar = Boutique;
        break;
      case 'default::Chateau':
        SelectedAvatar = Chateau;
        break;
      case 'default::Manoir':
        SelectedAvatar = Manoir;
        break;
      case 'default::MaisonBleu':
        SelectedAvatar = MaisonBleu;
        break;
      case 'default::Riad':
        SelectedAvatar = Riad;
        break;
      case 'default::Voiture':
        SelectedAvatar = Voiture;
        break;
      default:
        break;
    }
    return <SelectedAvatar height={style.height} width={style.height} style={style} />;
  }

  if (avatarInfo.indexOf('://') > -1 || avatarInfo.indexOf('data:image') > -1) {
    return <Image style={style} uri={avatarInfo} />;
  }

  return <S3Image style={style} s3key={avatarInfo} />;
}
