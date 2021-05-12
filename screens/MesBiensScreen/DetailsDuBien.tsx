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
  StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  useLinkTo, useNavigation,
  // useRoute
} from '@react-navigation/native';

import Icon from '../../components/Icon';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
// import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import WomanAvatar from '../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';

// import comptesData from '../../mockData/comptesData';
import clientData from '../../mockData/clientDATA';

function DetailsBien() {
  const navigation = useNavigation();
  // const route = useRoute();
  const linkTo = useLinkTo();
  const theme = useTheme();

  // const [compte, setCompte] = useState(comptesData);

  const allerMonBudget = () => {
    navigation.navigate('MonBudget');
  };
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
    navigation.navigate('ModifierCharacteristiques');
  };

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      {/**
       *  I. Details du bien
       */}
      <Layout style={[
        styles.container,
        { backgroundColor: '#f6f6f6' }]}
      >
        <Text category="h1" status="basic">
          Détails du bien
          {/**
          {route.params.id}
           */}
        </Text>
        <Layout style={{ alignItems: 'center', backgroundColor: 'transparent', marginTop: 30 }}>
          <MaisonVert
            height={100}
            width={100}
            style={{ marginRight: 12, marginBottom: 10 }}
          />
          <Text category="h2" status="basic">
            La Maison de JP
          </Text>
        </Layout>

      </Layout>

      {/**
       *  II. Compteurs
       */}
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Compteurs
        </Text>

        <Layout style={{
          flexDirection: 'row', borderRadius: 10, paddingVertical: 20,
        }}
        >
          <Layout style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
            <Text category="h3" status="success" style={{ marginTop: 14 }}>+ 500 €</Text>
          </Layout>

          <Layout style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Prochaine dépense
            </Text>
            <Text category="h3" status="danger" style={{ marginTop: 14 }}>- 160 €</Text>
          </Layout>

          <Layout style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Réntabilité du bien
            </Text>
            <Text category="h3" status="warning" style={{ marginTop: 14 }}>60 %</Text>
          </Layout>
        </Layout>

      </Layout>

      {/**
       *  III. Budget
       */}
      <Layout style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Budget
        </Text>
        {/**   1   */}
        <Layout style={styles.docs}>
          <TouchableOpacity
            onPress={allerMonBudget}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 17, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Mon Budget
            </Text>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *  IV. Nos Services
       */}
      <Layout style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Nos Services
        </Text>
        {/**   1   */}
        <Layout
          style={[
            styles.docs,
            { marginBottom: 10 },
          ]}
        >

          <TouchableOpacity
            onPress={allerTresorerie}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="money" size={30} color={theme['color-success-400']} style={{ marginRight: 10 }} />
            <Text category="h5">
              Ma Trésorerie (Lier un compte bancaire)
            </Text>

          </TouchableOpacity>

        </Layout>

        {/**   2   */}
        <Layout style={[
          styles.docs,
          { marginBottom: 10 },
        ]}
        >

          <TouchableOpacity
            onPress={allerMesRapports}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
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
          </TouchableOpacity>

        </Layout>

        {/**   3   */}
        <Layout style={styles.docs}>

          <TouchableOpacity
            onPress={allerMonAssistant}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
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

          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *  V. Characteristiques
       */}
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Charactéristiques
        </Text>
        <Layout style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text category="h6" status="basic">Localisation</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 6 }}>{clientData.AdresseType.fields[0].adresse}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Date d'acquisition</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
            {clientData.Client.fields[0].email}
          </Text>
          <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Type de bien</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>{clientData.AdresseType.fields[0].ville}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 10 }}>Mode de détention</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>{clientData.Client.fields[0].numeroTel}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 8 }}>Nombre de parts</Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>{clientData.AdresseType.fields[0].ville}</Text>
        </Layout>

        <TouchableOpacity onPress={allerModifierCharacteristics}>
          <Text category="h5" status="info" style={styles.buttonText}>Modifier le bien</Text>
        </TouchableOpacity>
      </Layout>

      {/**
       *  VI. Géstion des locataires
       */}
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Géstion des locataires
        </Text>
        <Layout style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text category="h6" status="basic">
            {clientData.Client.fields[0].prenom}
            {' '}
            {clientData.Client.fields[0].nom}
          </Text>
          <Text category="h6" appearance="hint" style={{ marginTop: 6 }}>{clientData.AdresseType.fields[0].adresse}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text category="h6" status="basic" style={{ marginTop: 7 }}>Date de fin de bail</Text>
          <Text
            category="h6"
            appearance="hint"
            style={{
              marginTop: 5,
            }}
          >
            {clientData.Client.fields[0].dateDeNaissance}
          </Text>
        </Layout>

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
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Documents
        </Text>
        <Layout style={styles.docs}>
          <Text category="p2">Aide_Déclaration_Impôts_2021</Text>

          <Layout style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {}}>
              <IconUIKitten name="cloud-download" fill="#b5b5b5" style={{ height: 14, width: 14, marginRight: 24 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <IconUIKitten name="eye" fill="#b5b5b5" style={{ height: 16.5, width: 16.5, paddingRight: 3.5 }} />
            </TouchableOpacity>
          </Layout>
        </Layout>

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
       *  VIII. Partager votre bien
       */}
      <Layout style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Partager votre bien
        </Text>
        <Layout style={styles.docs}>

          <Layout style={{
            flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center',
          }}
          >
            <WomanAvatar height={50} width={50} style={{ marginRight: 18 }} />

            <Layout style={{ flexDirection: 'column' }}>
              <Text category="p1" status="basic">
                Marie Dupont
              </Text>
              <Text category="p2" appearance="hint">
                Lecture Seule
              </Text>
            </Layout>

          </Layout>

        </Layout>

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
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
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
    borderRadius: 10,
  },

  // Aide Declaration Impots
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
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
