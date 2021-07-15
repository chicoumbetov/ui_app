import React, { useEffect, useState } from 'react';
import { Spinner, Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useApolloClient } from 'react-apollo';

import moment from 'moment';

import API from '@aws-amplify/api';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
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

import ActivityIndicator from '../../../components/ActivityIndicator';
import Button from '../../../components/Button';
import UIKittenIconButton from '../../../components/Icon/UIKittenIconButton';

const QuittanceLoyer2 = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'quittance-loyer-2'>>();
  const navigation = useNavigation();
  const { bienget } = useGetRealEstate(route.params.idBien);
  const createDocument = useCreateDocumentMutation();
  const client = useApolloClient();
  const user = useUser();
  const [newDocument, setNewDocument] = useState<DocumentItem | undefined | null | -1>(undefined);
  const [sending, setSending] = useState(0);

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
  bailEndDate.setHours(23, 59, 59, 59);

  const paramsDate = DateUtils.parseToDateObj(route.params.date);
  // console.log('route.params : ', moment(route.params.date).format('DD/MM/YYYY'));

  // console.log('compare:',
  // moment(bailEndDate).format('DD/MM/YYYY') >= moment(route.params.date).format('DD/MM/YYYY'));

  useEffect(() => {
    (async () => {
      if (!newDocument && bienget) {
        const documentDate = DateUtils.parseToDateObj(route.params.date);
        documentDate.setHours(0, 0, 0, 0);

        if (tenant && bailStartDate <= paramsDate
            && paramsDate <= bailEndDate) {
          // console.log('asyyync');
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
          if (documentEndDate >= bailEndDate) {
            documentEndDate = bailEndDate;
          }
          // console.log('documentEndDate', documentEndDate);

          const startDate = moment(documentStartDate).format('DD/MM/YYYY');
          const endDate = moment(documentEndDate).format('DD/MM/YYYY');

          const key = `quittance_${tenant.id}_${moment(route.params.date).format('MM/YYYY')}`;
          const document = await getDocumentByKey(client, key);
          // console.log('Quittance document', document);

          // eslint-disable-next-line no-underscore-dangle
          if (document && !document._deleted) {
            setNewDocument(document);
          } else {
            /**
             *  route.params.idTenant - chosen tenant from previous page
             *  item?.tenantId        - tenant from budgetLineDeadline, guy that pays this rent;
             *
             *  paramsDate - chosen date from previous page
             *  dateBudgetLine - date from budgetLIneDeadline,
             *  date when tenant pay his rent every month
             *
             *
             * Show only those budgetLine that correspond to chosen Tenant
             * and only affected ones for period that is demanded
             */
            const budgetLine = bienget.budgetLineDeadlines?.items?.find(
              (item) => {
                const dateBudgetLine = DateUtils.parseToDateObj(item?.date);
                // console.log('budgetLines', item);
                // console.log('paramsDate', paramsDate);
                return item?.tenantId === route.params.idTenant
                      && dateBudgetLine.getMonth() === paramsDate.getMonth();
              },
            );
            if (budgetLine) {
              /**
               *
               * We don't need to know how long tenant lived in house since we will DIRECTLY show
               * his expenses, mouvement that he made on his bank when he pay to houseHolder
               *
               */
              const rentalFee = budgetLine.amount - (budgetLine.rentalCharges || 0);
              const charges = budgetLine.rentalCharges || 0;
              const total = rentalFee + charges;

              // we pass the necessary data inside {} to template
              // in order to generate it with these data
              const result = await pdfGenerator(pdfTemplateQuittance, {
                bienget,
                user,
                tenant,
                date: moment(route.params.date).format('DD/MM/YYYY'),
                startDate,
                endDate,
                rentalFee,
                charges,
                total,
              });

              if (result !== false) {
                // console.log('result', result);
                const name = `Quittance_Loyer_${bienget.name}_${moment(route.params.date).format('MM/YYYY')}.pdf`;
                const s3file = await Upload(result, `realEstate/${bienget.id}/`, name);
                // console.log('s3file:', s3file);
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
            } else {
              setNewDocument(-1);
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
        <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
      </View>

      <Separator />
      {/**
       First: check if doc exist

       Second: check if tenant lived in chosen period

       Third: check if houseHolder affected real mouvements
       to created mouvements in MonBudget section
       */}

      {(bailStartDate <= paramsDate
                && paramsDate <= bailEndDate)
        ? (
          newDocument
            ? (
              newDocument !== -1 ? (
                <View style={{ paddingHorizontal: 27 }}>
                  <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
                  <DocumentComponent document={newDocument} />
                  <Button
                    onPress={async () => {
                      setSending(1);
                      const result = await API.get('omedomrest', `/budgetinsight/send-quittance?DOCUMENT_ID=${newDocument.id}&EMAIL=${tenant?.email}`, {});
                      setSending(result.success ? 2 : 0);
                    }}
                    size="large"
                    style={{ width: 239 }}
                    disabled={sending === 1}
                    accessoryRight={() => {
                      if (sending === 1) {
                        return <Spinner status="basic" />;
                      }
                      if (sending === 2) {
                        return (
                          <UIKittenIconButton
                            fill="white"
                            name="checkmark-outline"
                            width={25}
                            height={25}
                          />
                        );
                      }
                      return <></>;
                    }}
                    status={sending === 2 ? 'success' : 'primary'}
                  >
                    Envoyer la quittance au locataire
                  </Button>
                </View>
              ) : (
                <Text style={{ padding: 27, paddingBottom: 5 }}>
                  {/* eslint-disable-next-line max-len */}
                  Vous n’avez pas encore perçu le loyer (ou avez oublié d’affecter le mouvement bancaire)
                </Text>
              )
            ) : (
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30, paddingHorizontal: 27,
              }}
              >
                <ActivityIndicator />
              </View>
            )
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

    </MaxWidthContainer>
  );
};

export default QuittanceLoyer2;

// const styles = StyleSheet.create({});
