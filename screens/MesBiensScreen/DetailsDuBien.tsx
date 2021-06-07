/**
 * Page 2 Mes Biens -> DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import {
  Text, Icon as IconUIKitten, useTheme,
} from '@ui-kitten/components';
import {
  Alert,
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  useLinkTo, useNavigation, useRoute,
} from '@react-navigation/native';

import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import * as DocumentPicker from 'expo-document-picker';
import moment from 'moment';
import Icon from '../../components/Icon';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
// import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import WomanAvatar from '../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';

// import comptesData from '../../mockData/comptesData';
// import clientData from '../../mockData/clientDATA';
import { useDeleteRealEstateMutation, useGetRealEstate } from '../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../types';
import { Upload } from '../../utils/S3FileStorage';
import Card from '../../components/Card';
import Separator from '../../components/Separator';
import DocumentComponent from '../../components/DocumentComponent';
import { useDocumentList } from '../../src/API/Document';

function DetailsBien() {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const theme = useTheme();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'detail-bien'>>();
  const { bien } = useGetRealEstate(route.params.id);
  const { documentList } = useDocumentList();
  // console.log('detail bien document', documentList);

  const [typeRevenu, setTypeRevenu] = useState<string>();

  useEffect(() => {
    switch (bien?.type) {
      default:
        setTypeRevenu('Type de bien');
        break;
      case 'mainHome':
        setTypeRevenu('Résidence Principal');
        break;
      case 'secondHome':
        setTypeRevenu('Résidence Secondaire');
        break;
      case 'professionnalRentalInvestment':
        setTypeRevenu('Investissement Locatif Professionnel ou Commercial');
        break;
      case 'privateRentalInvestment':
        setTypeRevenu('Investissement Locatif Particulier');
        break;
    }
  }, []);

  // const [compte, setCompte] = useState(comptesData);

  const allerMonBudget = () => {
    navigation.navigate('mon-budget', { id: route.params.id });
  };
  // console.log('Detail Bien: ', bien);
  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };

  const allerMesRapports = () => {
    navigation.navigate('mes-rapports');
  };

  const allerMonAssistant = () => {
    linkTo('/mon-assistant');
  };
  const allerPartagerBien = () => {
    navigation.navigate('partager-bien');
  };
  const allerModifierCharacteristics = () => {
    navigation.navigate('modifier-characteristique', { id: route.params.id });
  };

  const deleteRealEstate = useDeleteRealEstateMutation;
  const supprimerLeRevenue = async () => {
    return false;
    Alert.alert(
      'Suppression de revenue',
      '',
      [{
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Valider',
        onPress: async () => {
          await deleteRealEstate();
        },
      }],
    );
  };
  // console.log(bien?.budgetLines?.items?.pop()?.amount);
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {/**
       *  I. Details du bien
       */}
      <View style={styles.container}>
        <Text category="h1" status="basic">
          Détails du bien
          {/**
          {route.params.id}
           */}
        </Text>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <MaisonVert
            height={100}
            width={100}
            style={{ marginRight: 12, marginBottom: 10 }}
          />
          <Text category="h2" status="basic">
            {bien?.name}
          </Text>
        </View>

      </View>

      {/**
       *  II. Compteurs
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Compteurs
        </Text>

        <Card style={{ flexDirection: 'row' }}>
          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
            <Text category="h3" status="success" style={{ marginTop: 14 }}>

              {`+ ${bien?.budgetLines?.items?.pop()?.amount} €`}
            </Text>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Prochaine dépense
            </Text>
            <Text category="h3" status="danger" style={{ marginTop: 14 }}>- 160 €</Text>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Réntabilité du bien
            </Text>
            <Text category="h3" status="warning" style={{ marginTop: 14 }}>60 %</Text>
          </View>
        </Card>

      </View>

      {/**
       *  III. Budget
       */}
      <Separator />
      <View style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Budget
        </Text>
        {/**   1   */}
        <Card
          onPress={allerMonBudget}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
          }]}
        >
          <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
          <Text style={{
            fontSize: 17, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
          }}
          >
            Mon Budget
          </Text>
        </Card>

      </View>

      {/**
       *  IV. Nos Services
       */}
      <Separator />
      <View style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Nos Services
        </Text>
        {/**   1   */}
        <Card
          onPress={allerTresorerie}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }]}
        >
          <Icon name="money" size={30} color={theme['color-success-400']} style={{ marginRight: 10 }} />
          <Text category="h5">
            Ma Trésorerie
          </Text>
        </Card>

        {/**   2   */}
        <Card
          onPress={allerMesRapports}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }]}
        >
          <IconUIKitten
            name="trending-up-outline"
            fill={theme['color-primary-400']}
            style={{
              height: 30, width: 30, marginRight: 10,
            }}
          />
          <Text category="h5">
            Mes Rapports
          </Text>
        </Card>

        {/**   3   */}
        <Card
          onPress={allerMonAssistant}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
          }]}
        >
          <IconUIKitten
            name="file-text-outline"
            fill={theme['color-primary-400']}
            style={{
              height: 30, width: 30, marginRight: 10,
            }}
          />
          <Text category="h5">
            Mon Assistant
          </Text>
        </Card>

      </View>

      {/**
       *  V. Characteristiques
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Caractéristiques
        </Text>
        <Card style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text category="h6" status="basic">Localisation</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 6 }}>
            {`${bien?.address?.address} ${bien?.address?.postalCode} ${bien?.address?.city}`}
          </Text>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Date d'acquisition</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.purchaseYear || undefined}
          </Text>
          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Type de bien</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {`${typeRevenu}`}
          </Text>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 10 }}>Mode de détention</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.ownName ? 'Nom propre' : 'Société'}
          </Text>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Nombre de parts</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {`${bien?.detentionPart || undefined} %`}
          </Text>
        </Card>

        <TouchableOpacity onPress={allerModifierCharacteristics}>
          <Text category="h5" status="info" style={styles.buttonText}>Modifier le bien</Text>
        </TouchableOpacity>
      </View>

      {/**
       *  VI. Gestion des locataires
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Gestion des locataires
        </Text>

        {/* use SectionList to render several accounts with its types and details */}
        {/**
          <Text category="h6" status="basic">
            {clientData.prenom}
          </Text>
           */}
        {bien?.tenants?.map((tenant) => {
          const { id } = tenant;
          return (
            <Card style={styles.compteSection} key={id}>
              <Text category="h6" status="basic">{`${tenant?.firstname} ${tenant?.lastname}`}</Text>
              <Text category="h6" appearance="hint">{`${tenant?.amount} €`}</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 6 }} />
              <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginBottom: 15 }} />

              <Text category="h6" status="basic" style={{ marginTop: 7 }}>Date de fin de bail</Text>
              <Text
                category="h6"
                appearance="hint"
                style={{
                  marginTop: 5,
                }}
              >
                {`${moment(tenant?.endDate).format('L')}`}
              </Text>
            </Card>
          );
        }) || undefined}

        <View style={styles.button}>
          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/**
       *  VII. Documents
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Documents
        </Text>
        {documentList?.listDocuments?.items?.map(
          (item) => <DocumentComponent key={item?.id} document={item} />,
        )}

        <View style={styles.button}>
          <TouchableOpacity onPress={async () => {
            // console.log('should');
            const doc = await DocumentPicker.getDocumentAsync();
            const key = await Upload(doc, `biens/${route.params.id}/documents/`);
            // console.log(key);
          }}
          >
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/**
       *  VIII. Partager votre bien
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Partager votre bien
        </Text>

        <Card style={[styles.docs, {
          justifyContent: 'flex-start',
        }]}
        >
          <WomanAvatar height={50} width={50} style={{ marginRight: 18 }} />

          <View style={{ flexDirection: 'column' }}>
            <Text category="p1" status="basic">
              Marie Dupont
            </Text>
            <Text category="p2" appearance="hint">
              Lecture Seule
            </Text>
          </View>

        </Card>

        <View style={styles.button}>
          <TouchableOpacity onPress={allerPartagerBien}>
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/**
       *  Supprimer le bien
       */}
      <Separator />

      <TouchableOpacity onPress={() => supprimerLeRevenue()}>
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Text category="h5" status="danger" style={{ marginVertical: 20 }}>
            Supprimer le bien
          </Text>

        </View>
      </TouchableOpacity>

    </MaxWidthContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 26,
  },

  // Compteurs
  oneThirdBlock: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: 94,
    justifyContent: 'center',
    textAlign: 'center',
  },

  // Characteristiques
  compteSection: {
    paddingVertical: 24,
    paddingHorizontal: 26.5,
    marginBottom: 10,
  },

  // Aide Declaration Impots
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 28,
  },

  // Ajouter Supprimer buttons
  button: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  buttonText: {
    marginLeft: 6,
    marginTop: 20,
  },
});

export default DetailsBien;
