import React, { useEffect, useState } from 'react';
import { Icon, Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import ActivityIndicator from '../../../components/ActivityIndicator';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
// import clientData from '../../../mockData/clientDATA';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMonAssistantParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Separator from '../../../components/Separator';
import Card from '../../../components/Card';
import pdfGenerator from '../../../utils/pdfGenerator/pdfGenerator';
import { pdfTemplateQuittance } from '../../../pdfTemplates/TemplateQuittanceLoyer';
import { Upload } from '../../../utils/S3FileStorage';
import { DocumentItem, useCreateDocumentMutation } from '../../../src/API/Document';

const QuittanceLoyer2 = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'quittance-loyer-2'>>();
  const { bien } = useGetRealEstate(route.params.id);
  const createDocument = useCreateDocumentMutation();
  const [newDocument, setNewDocument] = useState<DocumentItem | undefined | null>(undefined);

  useEffect(() => {
    (async () => {
      if (!newDocument && bien) {
        const result = await pdfGenerator(pdfTemplateQuittance, { bien });
        if (result !== false) {
          console.log(result);
          const s3file = await Upload(result, `realEstate/${bien.id}/`);
          console.log(s3file);
          if (s3file !== false) {
            const doc = await createDocument.createDocument({
              variables: {
                input: {
                  s3file: s3file.key,
                  realEstateId: bien.id,
                  name: `Quittance_Loyer_${bien.name}_${route.params.anneeEcheance}`,
                },
              },
            });
            setNewDocument(doc.data?.createDocument);
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
        style: {
          padding: 27,
        },
      }}
    >

      <View style={{ marginBottom: 20 }}>
        <Text category="h1" style={{ marginBottom: 6 }}>Générer une quittance de loyer</Text>
        <CompteHeader title={bien?.name} />
      </View>

      <Separator />
      {newDocument
        ? (
          <>
            <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
            <Card onPress={() => {}}>
              <Text category="p2">
                Quittance_Loyer_
                {bien.name}
                _
                {route.params.anneeEcheance}
              </Text>
              <Icon name="eye" fill="#b5b5b5" style={{ height: 20, width: 20 }} />
            </Card>
          </>
        )
        : (<ActivityIndicator />)}

    </MaxWidthContainer>
  );
};

export default QuittanceLoyer2;

// const styles = StyleSheet.create({});
