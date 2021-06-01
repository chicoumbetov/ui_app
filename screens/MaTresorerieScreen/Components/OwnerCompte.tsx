import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CheckBox, Text, useTheme } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

import Card from '../../../components/Card';
import { RealEstateItem } from '../../../src/API/RealEstate';

type MonBienProps = { compte: RealEstateItem };

const OwnerCompte = (props: MonBienProps) => {
  const { compte } = props;

  const linkTo = useLinkTo();
  const theme = useTheme();
  const onTresoMouvement = (id: string) => {
    linkTo(`/ma-tresorerie/mouv-bancaires/${id}`);
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <Card
        // key={item.id}
      style={{ marginTop: 28 }}
    >
      <TouchableOpacity onPress={() => onTresoMouvement(compte.id)} style={styles.container}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}>
          <CheckBox
            checked={checked}
            status="danger"
            onChange={(nextChecked) => setChecked(nextChecked)}
          />
        </View>
        <View style={{ justifyContent: 'center', paddingHorizontal: 14, flex: 1 }}>
          <Text category="h6">
            Monsieur
            {' '}
            {compte?.name}
          </Text>
          <Text category="p2" appearance="hint">
            FR 1234 1234 1234 1234
          </Text>
          <Text category="p2" status="basic">
            Société générale
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            backgroundColor: theme['color-warning-500'],
            marginRight: 5,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderRadius: 30,
          }}
          >
            <Text status="control">12</Text>
          </View>

          <IconUIKitten
            name="arrow-ios-forward"
            fill="#000"
            style={{ height: 20, width: 20 }}
          />

        </View>

      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  window: {
    flexDirection: 'row',
    margin: 24,
    marginTop: 39,
    paddingTop: 31,
    paddingBottom: 28,
    paddingHorizontal: 37,
    borderRadius: 10,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },
});

export default OwnerCompte;
