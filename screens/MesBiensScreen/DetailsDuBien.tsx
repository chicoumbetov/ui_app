/**
 * Page 2 Mes Biens -> DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import {
  Layout, Text, Icon as IconUIKitten, useTheme,
} from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  useLinkTo, useNavigation, useRoute,
  // useRoute
} from '@react-navigation/native';

import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import * as DocumentPicker from 'expo-document-picker';
import Icon from '../../components/Icon';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
// import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import WomanAvatar from '../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';

// import comptesData from '../../mockData/comptesData';
import clientData from '../../mockData/clientDATA';
import { useGetRealEstate } from '../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../types';
import { Upload } from '../../utils/S3FileStorage';
import Card from '../../components/Card';
import Separator from '../../components/Separator';

function DetailsBien() {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const theme = useTheme();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'detail-bien'>>();
  const { bien } = useGetRealEstate(route.params.id);

  // const [compte, setCompte] = useState(comptesData);

  const allerMonBudget = () => {
    navigation.navigate('mon-budget', { id: route.params.id });
  };
  console.log('Detail Bien: ', bien);
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
    navigation.navigate('PartagerBien');
  };
  const allerModifierCharacteristics = () => {
    navigation.navigate('modifier-characteristique', { id: route.params.id });
  };

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
        <Layout style={{ alignItems: 'center', marginTop: 30 }}>
          <MaisonVert
            height={100}
            width={100}
            style={{ marginRight: 12, marginBottom: 10 }}
          />
          <Text category="h2" status="basic" style={{ height: 20 }}>
            {bien?.name}
          </Text>
        </Layout>

      </View>

      {/**
       *  II. Compteurs
       */}
      <Separator />
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Compteurs
        </Text>

        <Card style={{ flexDirection: 'row' }}>
          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
            <Text category="h3" status="success" style={{ marginTop: 14 }}>+ 500 €</Text>
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

      </Layout>

      {/**
       *  III. Budget
       */}
      <Separator />
      <Layout style={styles.container}>

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

      </Layout>

      {/**
       *  IV. Nos Services
       */}
      <Separator />
      <Layout style={styles.container}>

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

      </Layout>

      {/**
       *  V. Characteristiques
       */}
      <Separator />
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Caractéristiques
        </Text>
        <Card style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text category="h6" status="basic">Localisation</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 6 }}>
            {`${bien?.address?.address} ${bien?.address?.postalCode} ${bien?.address?.city}`}
          </Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Date d'acquisition</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.purchaseYear || undefined}
          </Text>
          <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Type de bien</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.type || undefined}
          </Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 10 }}>Mode de détention</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.ownName ? 'Nom propre' : 'Société'}
          </Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Nombre de parts</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {bien?.detentionPart || undefined}
          </Text>
        </Card>

        <TouchableOpacity onPress={allerModifierCharacteristics}>
          <Text category="h5" status="info" style={styles.buttonText}>Modifier le bien</Text>
        </TouchableOpacity>
      </Layout>

      {/**
       *  VI. Gestion des locataires
       */}
      <Separator />
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Gestion des locataires
        </Text>

        {/* use SectionList to render several accounts with its types and details */}
        {/**
          <Text category="h6" status="basic">
            {clientData.prenom}
          </Text>
           */}
        {bien?.tenants?.map((tenant) => (
          <Card style={styles.compteSection}>
            <Text category="h6" status="basic">{`${tenant?.firstname} ${tenant?.lastname}`}</Text>
            <Text category="h6" appearance="hint">{`${tenant?.amount} €`}</Text>
            <Text category="h6" appearance="hint" style={{ marginTop: 6 }} />
            <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

            <Text category="h6" status="basic" style={{ marginTop: 7 }}>Date de fin de bail</Text>
            <Text
              category="h6"
              appearance="hint"
              style={{
                marginTop: 5,
              }}
            >
              {`${tenant?.endDate}`}
            </Text>
          </Card>
        )) || undefined}

        <Layout style={styles.button}>
          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *  VII. Documents
       */}
      <Separator />
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Documents
        </Text>
        <Card style={styles.docs}>
          <Text category="p2">Aide_Déclaration_Impôts_2021</Text>

          <IconUIKitten name="cloud-download" fill="#b5b5b5" style={{ height: 17, width: 17 }} />
        </Card>

        <Layout style={styles.button}>
          <TouchableOpacity onPress={async () => {
            console.log('should');
            const doc = await DocumentPicker.getDocumentAsync();
            const key = await Upload(doc, `biens/${route.params.id}/documents/`);
            console.log(key);
          }}
          >
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>

      {/**
       *  VIII. Partager votre bien
       */}
      <Separator />
      <Layout style={styles.container}>
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

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerPartagerBien}>
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>

      {/**
       *  Supprimer le bien
       */}
      <Separator />
      <Layout style={[styles.container, { alignItems: 'center' }]}>
        <Text category="h5" status="danger" style={{ marginVertical: 20 }}>
          Supprimer le bien
        </Text>

      </Layout>

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
