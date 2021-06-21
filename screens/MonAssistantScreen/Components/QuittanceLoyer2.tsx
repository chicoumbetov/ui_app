import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useApolloClient } from 'react-apollo';

import moment from 'moment';
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
import DateUtils from '../../../utils/DateUtils';

const QuittanceLoyer2 = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'quittance-loyer-2'>>();
  const navigation = useNavigation();
  const { bienget } = useGetRealEstate(route.params.idBien);
  const createDocument = useCreateDocumentMutation();
  const client = useApolloClient();
  const user = useUser();
  const [newDocument, setNewDocument] = useState<DocumentItem | undefined | null>(undefined);

  /**
   *
   */
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
    setNewDocument(undefined);
  }, [route.params]);

  const tenant = bienget.tenants?.find(
    (item) => (item?.id === route.params.idTenant),
  );

  const bailStartDate = DateUtils.parseToDateObj(tenant?.startDate);
  bailStartDate.setHours(0, 0, 0, 0);
  const bailEndDate = DateUtils.parseToDateObj(tenant?.endDate);
  bailEndDate.setHours(0, 0, 0, 0);

  const paramsDate = DateUtils.parseToDateObj(route.params.date);

  // console.log('bailStartDate', moment(bailStartDate).format('DD/MM/YYYY'));
  // console.log('bailEndDate', moment(bailEndDate).format('DD/MM/YYYY'));
  // console.log('route.params : ', moment(route.params.date).format('DD/MM/YYYY'));

  // console.log('compare:',
  // moment(bailEndDate).format('DD/MM/YYYY') >= moment(route.params.date).format('DD/MM/YYYY'));

  useEffect(() => {
    (async () => {
      if (!newDocument && bienget) {
        const documentDate = DateUtils.parseToDateObj(route.params.date);
        documentDate.setHours(0, 0, 0, 0);

        if (tenant) {
          /** Set document date on first day of month */
          let documentStartDate = new Date(documentDate.valueOf());
          documentStartDate.setDate(1);

          /** Set document date on last day of month according on its length */
          let documentEndDate = new Date(documentDate.valueOf());
          documentEndDate.setDate(DateUtils.daysInMonth(
            documentEndDate.getMonth(),
            documentEndDate.getFullYear(),
          ));

          if (documentStartDate < bailStartDate) {
            documentStartDate = bailStartDate;
          }
          if (documentEndDate > bailEndDate) {
            documentEndDate = bailEndDate;
          }

          const startDate = moment(documentStartDate).format('DD/MM/YYYY');
          const endDate = moment(documentEndDate).format('DD/MM/YYYY');

          const key = `quittance_${tenant.id}_${moment(route.params.date).format('MM/YYYY')}`;
          const document = await getDocumentByKey(client, key);
          // console.log('Quittance document', document);
          if (document) {
            setNewDocument(document);
          } else {
            const result = await pdfGenerator(pdfTemplateQuittance, {
              bienget, user, tenant, date: moment(route.params.date).format('DD/MM/YYYY'), startDate, endDate,
            });

            if (result !== false) {
              // console.log('result', result);
              const name = `Quittance_Loyer_${bienget.name}_${moment(route.params.date).format('MM/YYYY')}.pdf`;
              const s3file = await Upload(result, `realEstate/${bienget.id}/`, name);
              // console.log(s3file);
              if (s3file !== false && bienget.id) {
                const doc = await createDocument.createDocument({
                  variables: {
                    input: {
                      s3file: s3file.key,
                      realEstateId: bienget.id,
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
  }, [bienget, newDocument]);

  // const onPdf = () => { navigation.navigate('pdf-screen'); };
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      <View style={{ marginVertical: 20, paddingHorizontal: 27 }}>
        <Text category="h1" style={{ marginBottom: 25 }}>Générer une quittance de loyer</Text>
        <CompteHeader title={bienget?.name} />
      </View>

      <Separator />
      {newDocument
        ? (

          <>
            { (bailStartDate <= paramsDate
                && bailEndDate >= paramsDate)
              ? (
                <View style={{ paddingHorizontal: 27 }}>
                  <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
                  <DocumentComponent document={newDocument} />
                </View>
              ) : (
                <>
                  <Text style={{ padding: 27, paddingBottom: 5 }}>
                    {`${tenant?.lastname} ${tenant?.firstname} n'était pas locataire de votre bien sur la période du `}
                    {moment(route.params.date).format('DD/MM/YYYY')}
                  </Text>
                  <Text style={{ paddingHorizontal: 27 }}>
                    {`${tenant?.lastname} ${tenant?.firstname} a été locataire de votre bien sur la période du  ${moment(bailStartDate).format('DD/MM/YYYY')} au ${moment(bailEndDate).format('DD/MM/YYYY')} `}
                  </Text>
                </>
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

export default QuittanceLoyer2;

// const styles = StyleSheet.create({});
