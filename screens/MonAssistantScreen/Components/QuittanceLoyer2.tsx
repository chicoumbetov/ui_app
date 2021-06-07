import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useApolloClient } from 'react-apollo';

import ActivityIndicator from '../../../components/ActivityIndicator';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
// import clientData from '../../../mockData/clientDATA';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMonAssistantParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Separator from '../../../components/Separator';
import pdfGenerator from '../../../utils/pdfGenerator/pdfGenerator';
import { Upload } from '../../../utils/S3FileStorage';
import {
  DocumentItem,
  getDocumentByKey,
  useCreateDocumentMutation,
} from '../../../src/API/Document';
import { useUser } from '../../../src/API/UserContext';
import { pdfTemplateQuittance } from '../../../pdfTemplates/index';
import DocumentComponent from '../../../components/DocumentComponent';

const QuittanceLoyer2 = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'quittance-loyer-2'>>();
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
        || route.params.date === undefined)) {
      navigation.dispatch(
        StackActions.replace('quittance-loyer'),
      );
    }
  }, [route]);

  useEffect(() => {
    (async () => {
      if (!newDocument && bien) {
        const tenant = bien.tenants?.filter(
          (item) => (item?.id === route.params.idTenant),
        ).pop();
        if (tenant) {
          const key = `quittance_${tenant.id}_${route.params.date}`;
          const document = await getDocumentByKey(client, key);
          console.log('Quittance document', document);
          if (document) {
            setNewDocument(document);
          } else {
            const result = await pdfGenerator(pdfTemplateQuittance, {
              bien, user, tenant, date: route.params.date,
            });
            if (result !== false) {
              console.log(result);
              const s3file = await Upload(result, `realEstate/${bien.id}/`);
              console.log(s3file);
              if (s3file !== false && bien.id) {
                const doc = await createDocument.createDocument({
                  variables: {
                    input: {
                      s3file: s3file.key,
                      realEstateId: bien.id,
                      key,
                      name: `Quittance_Loyer_${bien.name}_${route.params.date}.pdf`,
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
  }, [bien]);

  // const onPdf = () => { navigation.navigate('pdf-screen'); };
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      <View style={{ marginBottom: 20, paddingHorizontal: 27 }}>
        <Text category="h1" style={{ marginBottom: 6 }}>Générer une quittance de loyer</Text>
        <CompteHeader title={bien?.name} />
      </View>

      <Separator />
      {newDocument
        ? (
          <View style={{ paddingHorizontal: 27 }}>
            <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
            <DocumentComponent document={document} />
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

export default QuittanceLoyer2;

// const styles = StyleSheet.create({});
