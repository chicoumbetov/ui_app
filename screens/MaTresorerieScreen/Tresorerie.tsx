/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Text } from '@ui-kitten/components';
import {
  View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';

import MaxWidthContainer from '../../components/MaxWidthContainer';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import { useRealEstateList } from '../../src/API/RealEstate';
import ActivityIndicator from '../../components/ActivityIndicator';

import Card from '../../components/Card';
import Button from '../../components/Button';

const MaTresorerie = () => {
  // const [client] = useState(comptesData);
  // const theme = useTheme();
  const { loading, data } = useRealEstateList();
  const linkTo = useLinkTo();

  const onMaTresorerie2 = (id: string) => {
    linkTo(`/ma-tresorerie/ma-tresorerie-2/${id}`);
  };

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          paddingHorizontal: 26,
        },
      }}
    >
      <Text
        category="h1"
        status="basic"
        style={{ marginVertical: 35 }}
      >
        Ma Trésorerie
      </Text>

      <Text category="s2">
        Consulter votre trésorerie
      </Text>

      {loading
        ? <ActivityIndicator />
        : (
          <>
            {data?.listRealEstates?.items?.length > 0 ? (
              <>
                <Text category="p2" appearance="hint" style={{ marginTop: 15 }}>Sélectionner le bien</Text>
                {data?.listRealEstates?.items?.map(
                  (item) => item && (
                    <Card
                      key={item.id}
                      style={{
                        flexDirection: 'column', marginVertical: 10, padding: 17, borderRadius: 10,
                      }}
                      onPress={() => {
                        onMaTresorerie2(item.id);
                      }}
                    >
                      {/**
                           <MonBienResume title={item.title} id={item.id} />
                           */}
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <CompteHeader title={item.name} iconUri={item.iconUri} />
                        <IconUIKitten
                          name="arrow-ios-forward"
                          fill="#b5b5b5"
                          style={{
                            height: 16, width: 16, marginRight: 5, marginTop: 8,
                          }}
                        />
                      </View>
                    </Card>
                  ),
                )}
              </>
            ) : (
              <>
                <Text category="p2" style={{ marginTop: 20 }}>Vous n'avez pas encore de Biens vous devez d'abord créer un bien pour accéder à cette section</Text>

                <Button
                  size="large"
                  onPress={() => { onAjoutBien(); }}
                  style={{ marginVertical: 25 }}
                >
                  Ajouter un nouveau bien
                </Button>
              </>
            )}

          </>
        )}

    </MaxWidthContainer>
  );
};

// const styles = StyleSheet.create({});

export default MaTresorerie;
