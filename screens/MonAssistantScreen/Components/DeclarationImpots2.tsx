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
import { RentalType } from '../../../src/API';

const DeclarationImpots = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'declaration-impots-2'>>();
  const navigation = useNavigation();
  const { bienget } = useGetRealEstate(route.params.idBien);
  const createDocument = useCreateDocumentMutation();
  const client = useApolloClient();
  const user = useUser();
  const [newDocument, setNewDocument] = useState<DocumentItem | undefined | null>(undefined);

  const { createdAt } = bienget || {};
  console.log('bienget', bienget.budgetLineDeadlines);
  console.log('route params', route.params);
  // console.log('createdAt', createdAt);

  bienget.budgetLineDeadlines?.items?.map((item) => {
    if (item?.bankMouvementId) {
      console.log('declar item:', item);
    }
  });

  useEffect(() => {
    if (route && (route.params === undefined
        // || route.params.idTenant === undefined
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

  /**
  const tenant = bien.find(
    (item) => (bien.id === route.params.idBien),
  );
  */

  const paramsAskedDate = DateUtils.parseToDateObj(route.params.anneeEcheance).getFullYear();
  const paramsCreatedDate = DateUtils.parseToDateObj(createdAt).getFullYear();

  // console.log('date created at 2 ', paramsAskedDate);
  // console.log('date created at 333 ', paramsCreatedDate);

  useEffect(() => {
    (async () => {
      // console.log('Decl impots 2');
      if (!newDocument && bienget) {
        if (bienget.id === route.params.idBien) {
          const key = `declaration_${bienget.name}_${moment(route.params.anneeEcheance).format('YYYY')}`;

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
            console.log('passed data', bienget, user, route.params.anneeEcheance, previousYear);

            let ratioRentalType;
            if (
            // bienget.typeImpot === 'revenue_tax'
            // ||
              bienget.ownName === true
            ) {
              const sumNonMeublee = bienget.budgetLineDeadlines?.items?.map((item) => {
                if (item?.category === 'loyer' && item?.rentalType === 'unfurnished') {
                  return item.amount;
                }
              }).reduce((acc, curr) => (acc || 0) + (curr || 0), 0);
              console.log('sum non meub:', sumNonMeublee);

              const totalLoyer = bienget.budgetLineDeadlines?.items?.map((item) => {
                if (item?.category === 'loyer') {
                  return item.amount;
                }
              }).reduce((acc, curr) => (acc || 0) + (curr || 0), 0);
              console.log('total:', totalLoyer);

              const householderPart = bienget.detentionPart / 100;
              console.log('householderPart', householderPart);

              const ratioRentalType = (sumNonMeublee / totalLoyer) * householderPart;
              console.log('ratioRentalType', ratioRentalType);
            }
            let summ211Incomes = ;
            const result = await pdfGenerator(pdfTemplateDeclaration, {
              bienget,
              user,
              year: route.params.anneeEcheance,
              previousYear,
            });
            // console.log('result', result);
            if (result !== false) {
              const name = `Declaration_impots_${bienget.name}_${moment(route.params.anneeEcheance).format('YYYY')}.pdf`;
              const s3file = await Upload(result, `realEstate/${bienget.id}/`, name);
              // console.log('s3file', s3file);

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

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={{ margin: 27 }}>
        <Text category="h1" style={{ marginBottom: 25 }}>Générer une déclaration d'impôts</Text>
        <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
      </View>

      <Separator />

      {newDocument
        ? (
          <>
            { (paramsAskedDate >= paramsCreatedDate
            && paramsAskedDate <= paramsCreatedDate)
              ? (
                <View style={{ padding: 27 }}>
                  <Text category="h2" style={{ marginBottom: 30 }}>Votre document est prêt</Text>
                  <DocumentComponent document={newDocument} />
                </View>
              ) : (
                <View style={{ padding: 27 }}>
                  <Text>

                    {`${bienget.name} n'était pas crée en ${route.params.anneeEcheance}`}
                  </Text>
                  <Text style={{ paddingTop: 5 }}>
                    {`${bienget.name} a été ajoutée dans l'application en ${paramsCreatedDate}`}
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
