import React, { useEffect, useState } from 'react';
import {
  Text,
} from '@ui-kitten/components';
import { View } from 'react-native';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useApolloClient } from 'react-apollo';
import moment from 'moment';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
// import clientData from '../../../mockData/clientDATA';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMonAssistantParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Separator from '../../../components/Separator';
import { DocumentItem, getDocumentByKey, useCreateDocumentMutation } from '../../../src/API/Document';
import { useUser } from '../../../src/API/UserContext';
import DocumentComponent from '../../../components/DocumentComponent';
import ActivityIndicator from '../../../components/ActivityIndicator';
import pdfGenerator from '../../../utils/pdfGenerator/pdfGenerator';
import { pdfTemplateDeclaration } from '../../../pdfTemplates';
import { Upload } from '../../../utils/S3FileStorage';

const DeclarationImpots = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'declaration-impots-2'>>();
  const navigation = useNavigation();
  const { bien } = useGetRealEstate(route.params.idBien);
  const createDocument = useCreateDocumentMutation();
  const client = useApolloClient();
  const user = useUser();
  const [newDocument, setNewDocument] = useState<DocumentItem | undefined | null>(undefined);

  useEffect(() => {
    if (route && (route.params === undefined
        || route.params.idTenant === undefined
        || route.params.idBien === undefined
        || route.params.anneeEcheance === undefined)) {
      navigation.dispatch(
        StackActions.replace('declaration-impots'),
      );
    }
  }, [route]);

  // console.log('Decl impots 2 component: ', bien, client);

  useEffect(() => {
    setNewDocument(undefined);
    // console.log('Decl impots 2 set New doc');
  }, [route.params]);

  useEffect(() => {
    (async () => {
      // console.log('Decl impots 2');
      if (!newDocument && bien) {
        const tenant = bien.tenants?.find(
          (item) => (item?.id === route.params.idTenant),
        );
        if (tenant) {
          const key = `declaration_${tenant.id}_${moment(route.params.anneeEcheance).format('YYYY')}`;
          const document = await getDocumentByKey(client, key);
          // console.log('Declaration document', document);
          /** if document already exists then return it,
           * otherwise create
           * */
          if (document) {
            setNewDocument(document);
          } else {
            const result = await pdfGenerator(pdfTemplateDeclaration, {
              bien, user, tenant, date: route.params.anneeEcheance,
            });
            // console.log('result', result);
            if (result !== false) {
              const name = `Declaration_impots_${bien.name}_${moment(route.params.anneeEcheance).format('YYYY')}.pdf`;
              const s3file = await Upload(result, `realEstate/${bien.id}/`, name);
              // console.log('s3file', s3file);

              if (s3file !== false && bien.id) {
                const doc = await createDocument.createDocument({
                  variables: {
                    input: {
                      s3file: s3file.key,
                      realEstateId: bien.id,
                      key,
                      name,
                    },
                  },
                });
                setNewDocument(doc.data?.createDocument);
              }
            }
          }
        }
      }
    })();
  }, [bien, newDocument]);

  return (
  // const onPdf = () => { navigation.navigate('pdf-screen'); };
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={{ marginVertical: 20 }}>
        <Text category="h1" style={{ marginBottom: 25 }}>Générer une déclaration d'impôts</Text>
        <CompteHeader title={bien?.name} />
      </View>

      <Separator />

      <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
      {/**
      <Card
        onPress={() => {}}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text category="p2">
          Déclaration_Impôts_
          {bien?.name}
          _
          {route.params.anneeEcheance}
        </Text>
        <IconUIKitten name="eye" fill="#b5b5b5" style={{ height: 20, width: 20 }} />
      </Card>
      */}
      {newDocument
        ? (
          <View style={{ paddingHorizontal: 27 }}>
            <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
            <DocumentComponent document={newDocument} />
          </View>
        )
        : (
          <>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30, paddingHorizontal: 27,
            }}
            >
              <ActivityIndicator />
            </View>
          </>
        )}

    </MaxWidthContainer>
  );
};

export default DeclarationImpots;

// const styles = StyleSheet.create({});
