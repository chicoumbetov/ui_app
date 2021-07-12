import React, { useEffect, useState } from 'react';
import {
  Text,
} from '@ui-kitten/components';
import { View } from 'react-native';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useApolloClient } from 'react-apollo';
import moment from 'moment';
import _ from 'lodash';
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
import { BudgetLineType, RentalType } from '../../../src/API';
import {
  typeAssurance,
  typeBanque,
  typeCharge,
  typeDivers,
  typeImpots,
  typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import { hasKey } from '../../../utils/typeHelpers';
import ObjectHelper from '../../../utils/ObjectHelper';
import Formatter from '../../../utils/Formatter';

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

  const paramsAskedDate = route.params.anneeEcheance;
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

            console.log('before sorting by date budgetLineDeadlines:', bienget.budgetLineDeadlines?.items);

            const bdlOfChosenYear = bienget.budgetLineDeadlines?.items?.filter((item) => {
              if (DateUtils.parseToDateObj(item?.date).getFullYear() <= paramsAskedDate
                    && DateUtils.parseToDateObj(item?.date).getFullYear() >= paramsAskedDate
                    /* && item?.bankMouvementId !== null */) {
                return true;
              }
              return false;
            });
            console.log('bdlOfChosenYear', bdlOfChosenYear);

            if (bdlOfChosenYear && bdlOfChosenYear.length > 0) {
              const ratioElements = bdlOfChosenYear.reduce((acc, item) => {
                if (item?.category === 'loyer') {
                  if (item?.rentalType === 'unfurnished') {
                    return {
                      sumNonMeuble: acc.sumNonMeuble + item?.amount,
                      sumTotal: acc.sumTotal + item?.amount,
                    };
                  }
                  return {
                    sumNonMeuble: acc.sumNonMeuble,
                    sumTotal: acc.sumTotal + item?.amount,
                  };
                }
                return acc;
              }, { sumNonMeuble: 0, sumTotal: 0 });

              const householderPart = (bienget.detentionPart || 0) / 100;
              console.log('householderPart', householderPart);

              const total = (ratioElements?.sumTotal || 0);
              if (total > 0) {
                const ratioRentalPart = ((ratioElements?.sumNonMeuble || 0) / total)
                      * householderPart;

                const allPossibleTypes = {
                  ...typeCharge,
                  ...typeImpots,
                  ...typeRevenu,
                  ...typeAssurance,
                  ...typeDivers,
                  ...typeBanque,
                };

                const declarationLineTotals: { [key: string]: number } = {};

                bdlOfChosenYear.forEach((item) => {
                  if (item) {
                    const categoryKey = (item.category as (keyof typeof allPossibleTypes));
                    const type = allPossibleTypes[categoryKey];
                    // has helps to detect additional property
                    if (hasKey('ligneDeclarationImpot', type)) {
                      if (typeof type.ligneDeclarationImpot === 'string') {
                        /**
                           * first line contain object with key and its value
                           *
                           * second line is placed as the key in declarationLineTotals
                           * that is declared just above
                           *
                           * third line is placed as value for second line
                           */
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          type.ligneDeclarationImpot, // [key: string]
                          (item.type === BudgetLineType.Expense
                            ? -1 : 1) * item.amount, // number of [key: string]
                        );
                      } else if (categoryKey === 'loyer') {
                        // 211
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.loyer.ligneDeclarationImpot.loyer,
                          item.amount - ((item.managementFees || 0) + (item.rentalCharges || 0)),
                        );
                        // 212
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.loyer.ligneDeclarationImpot.charges,
                          (item.rentalCharges || 0),
                        );
                        // 221
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.loyer.ligneDeclarationImpot.frais_de_gestion,
                          -(item.managementFees || 0),
                        );
                        // 227
                      } else if (categoryKey === 'taxes_foncieres') {
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.taxes_foncieres.ligneDeclarationImpot.amount,
                          -(item.amount - (item.householdWaste || 0)),
                        );
                      } else if (categoryKey === 'mensualite_credit') {
                        // 223
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.mensualite_credit.ligneDeclarationImpot.assurance,
                          -(item.infoCredit?.assurance || 0),
                        );
                        // 250
                        ObjectHelper.addToObjectKey(
                          declarationLineTotals,
                          allPossibleTypes.mensualite_credit.ligneDeclarationImpot.interest,
                          -(item.infoCredit?.interest || 0) * 100,
                        );
                      }
                    }
                  }
                });

                Object.keys(declarationLineTotals).forEach((objectKey) => {
                  declarationLineTotals[objectKey] *= ratioRentalPart;
                  if (objectKey === '211'
                      || objectKey === '212'
                      || objectKey === '213'
                      || objectKey === '214'
                  ) {
                    ObjectHelper.addToObjectKey(
                      declarationLineTotals,
                      '215',
                      declarationLineTotals[objectKey],
                    );
                  }
                });

                const formatedLineTotals : { [key: string]: string } = {};

                Object.keys(declarationLineTotals).forEach((objectKey) => {
                  formatedLineTotals[objectKey] = Formatter
                    .currencyFormatter
                    .format(declarationLineTotals[objectKey]);
                });

                console.log('declarationLineTotals:', declarationLineTotals);

                const result = await pdfGenerator(pdfTemplateDeclaration, {
                  bienget,
                  user,
                  year: route.params.anneeEcheance,
                  previousYear,
                  formatedLineTotals,
                  declarationLineTotals,
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
