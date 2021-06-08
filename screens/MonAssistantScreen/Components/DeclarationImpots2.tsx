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
import DateUtils from '../../../utils/DateUtils';

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

  const tenant = bien.tenants?.find(
    (item) => (item?.id === route.params.idTenant),
  );
  const bailStartDate = DateUtils.parseToDateObj(tenant?.startDate);
  bailStartDate.setHours(0, 0, 0, 0);
  const bailEndDate = DateUtils.parseToDateObj(tenant?.endDate);
  bailEndDate.setHours(0, 0, 0, 0);

  const startYear = new Date(bailStartDate.valueOf());
  const endYear = new Date(bailEndDate.valueOf());
  // console.log('start end year', startYear.getFullYear(), endYear.getFullYear());

  useEffect(() => {
    (async () => {
      // console.log('Decl impots 2');
      if (!newDocument && bien) {
        if (tenant) {
          const key = `declaration_${tenant.id}_${moment(route.params.anneeEcheance).format('YYYY')}`;
          const documentMonth = route.params.anneeEcheance;
          const previousYear = route.params.anneeEcheance - 1;
          // console.log(documentMonth);
          const document = await getDocumentByKey(client, key);
          // console.log('Declaration document', document);
          /** if document already exists then return it,
           * otherwise create
           * */
          if (document) {
            setNewDocument(document);
          } else {
            const result = await pdfGenerator(pdfTemplateDeclaration, {
              bien,
              user,
              tenant,
              startDate: moment(tenant.startDate).format('DD/MM/YYYY'),
              endDate: moment(tenant.endDate).format('DD/MM/YYYY'),
              year: route.params.anneeEcheance,
              previousYear,
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
      <View style={{ margin: 27 }}>
        <Text category="h1" style={{ marginBottom: 25 }}>Générer une déclaration d'impôts</Text>
        <CompteHeader title={bien?.name} />
      </View>

      <Separator />

      {newDocument
        ? (
          <>
            { (route.params.anneeEcheance >= startYear.getFullYear()
                && endYear.getFullYear() >= route.params.anneeEcheance)
              ? (
                <View style={{ padding: 27 }}>
                  <Text category="h2" style={{ marginBottom: 30 }}>Votre document est prêt</Text>
                  <DocumentComponent document={newDocument} />
                </View>
              ) : (
                <View style={{ padding: 27 }}>
                  <Text>
                    {`${tenant?.lastname} ${tenant?.firstname} n'a pas loué à l'année de ${route.params.anneeEcheance}`}
                  </Text>
                  <Text style={{ paddingTop: 5 }}>
                    {`Location était entre ${moment(bailStartDate).format('DD/MM/YYYY')} et ${moment(bailEndDate).format('DD/MM/YYYY')} `}
                  </Text>
                </View>

              )}
          </>
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
