import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Card from '../../../components/Card';
import { UserItem } from '../../../src/API/UserContext';
import { useBillingHistoriesList } from '../../../src/API/BillingHistory';
import { ModelSortDirection, SubscriptionType } from '../../../src/API';

/**
type DataProps = {
  clientData: {
    Client: ClientProps,
    AdresseType: AdresseProps,
  }
};

type ClientProps = {
  id: string,
  fields: [{
    id: string,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    dateDeNaissance: string,
  }, {
    id: string,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    dateDeNaissance: string,
  }]
};

type AdresseProps = {
  id: string,
  fields: [{
    id: string,
    adresse: string,
    complementAdresse: string,
    codePostal: string,
    ville: string,
    pays: string,
  }, {
    id: string,
    adresse: string,
    complementAdresse: string,
    codePostal: string,
    ville: string,
    pays: string,
  }]
};
 */

type AbonnementProps = {
  utilisateur: UserItem
};

const AbonnementComp = (props: AbonnementProps) => {
  const navigation = useNavigation();
  const { utilisateur } = props;
  const lastBilling = useBillingHistoriesList({
    userId: utilisateur.id,
    sortDirection: ModelSortDirection.DESC,
    limit: 1,
  }, 'cache-and-network');
  // console.log('info props', clientData.Client.fields[0]);
  // console.log('AdresseType props', clientData.AdresseType);

  const onPress = () => {
    navigation.navigate('modifier-info-1');
  };

  if (!lastBilling.billingHistories
      || lastBilling.billingHistories.length <= 0
      || !lastBilling.billingHistories[0]) {
    return (<></>);
  }

  const lastBillingItem = lastBilling.billingHistories[0];
  let name = 'Période d\'essai';
  let periodicity = '';
  let price = '';

  switch (lastBillingItem.subscription) {
    case SubscriptionType.Trial:
      name = 'Période d\'essai';
      break;
    case SubscriptionType.MoreThanFive:
    case SubscriptionType.MoreThanFiveAnnual:
      name = 'Formule à partir de 6 biens';
      break;
    case SubscriptionType.OneToTwo:
    case SubscriptionType.OneToTwoAnnual:
      name = 'Formule 1 à 2 biens';
      break;
    case SubscriptionType.ThreeToFive:
    case SubscriptionType.ThreeToFiveAnnual:
      name = 'Formule 3 à 5 biens';
      break;
    default:
      break;
  }
  switch (lastBillingItem.subscription) {
    case SubscriptionType.Trial:
      periodicity = `Jusqu'au ${moment(lastBillingItem.nextRenewDate).format('DD/MM/YYYY')}`;
      break;
    case SubscriptionType.MoreThanFiveAnnual:
    case SubscriptionType.OneToTwoAnnual:
    case SubscriptionType.ThreeToFiveAnnual:
      periodicity = 'Annuelle';
      break;
    case SubscriptionType.MoreThanFive:
    case SubscriptionType.OneToTwo:
    case SubscriptionType.ThreeToFive:
      periodicity = 'Mensuelle';
      break;
    default:
      break;
  }
  switch (lastBillingItem.subscription) {
    case SubscriptionType.Trial:
      price = 'Gratuit';
      break;
    case SubscriptionType.MoreThanFiveAnnual:
      price = '111,18 € TTC / an';
      break;
    case SubscriptionType.OneToTwoAnnual:
      price = '34,80 € TTC / an';
      break;
    case SubscriptionType.ThreeToFiveAnnual:
      price = '49,98 € TTC / an';
      break;
    case SubscriptionType.MoreThanFive:
      price = '10,90 € TTC / mois';
      break;
    case SubscriptionType.OneToTwo:
      price = '2,90 € TTC / mois';
      break;
    case SubscriptionType.ThreeToFive:
      price = '4,90 € TTC / mois';
      break;
    default:
      break;
  }

  return (

    <View style={{
      flex: 1, paddingTop: 32, paddingHorizontal: 28, marginVertical: 13,
    }}
    >
      <Text
        category="h2"
        style={{ marginBottom: 20 }}
      >
        Abonnement
      </Text>

      {/* use SectionList to render several accounts with its types and details */}
      <Card style={styles.compteSection}>

        <View style={{
          flex: 1, borderRightWidth: 0.5, borderRightColor: '#b5b5b5',
        }}
        >
          <Text category="h5">{name}</Text>
          <Text category="p1" style={{ marginTop: 3 }}>
            {periodicity}
          </Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Text category="h5" style={{ marginLeft: 31 }}>{price}</Text>
        </View>

      </Card>

      {/* <TouchableOpacity onPress={onPress}>
        <Text category="h5" status="info" style={styles.buttonTextLeft}>Changer de mode de paimenent</Text>
      </TouchableOpacity> */}

    </View>

  );
};

const styles = StyleSheet.create({

  compteSection: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonTextLeft: {
    marginVertical: 19.5,
    backgroundColor: 'transparent',
    paddingBottom: 18,
  },
});

export default AbonnementComp;
