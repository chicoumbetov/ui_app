/* Amplify Params - DO NOT EDIT
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { listBudgetLines } from '/opt/nodejs/src/BudgetLineQueries';
import { updateBudgetLine } from '/opt/nodejs/src/BudgetLineMutations';
import { createBudgetLineDeadline } from '/opt/nodejs/src/BudgetLineDeadlineMutations';
import {
  BudgetLineDeadline,
  CreateBudgetLineDeadlineInput,
  MortgageLoanDeadlineInfoInput,
} from '../../../../../src/API';
import DateUtils from './DateUtils';
import * as moment from 'moment';
import { listRealEstates } from '/opt/nodejs/src/RealEstateQueries';
import { useMemo } from 'react';

const aws = require('aws-sdk');

const lambda = new aws.Lambda({
  region: process.env.REGION,
});

enum BudgetLineType {
  Expense = 'Expense',
  Income = 'Income',
}

const AppSyncClient = getAppSyncClient(process.env);

const getRentability = (
  budgetLineDeadlines: (BudgetLineDeadline | null)[] | null | undefined,
  totalPrice: number,
  month: number = 0,
) => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date();
  startDate.setFullYear(currentYear - 1);
  const endDate = new Date();
  if (month !== 0) {
    startDate.setMonth(startDate.getMonth() + month);
    endDate.setMonth(endDate.getMonth() + month);
  }
  // budgetLineDeadlines of last 12 months
  const result2 = budgetLineDeadlines?.filter((o) => moment(o?.date, 'YYYY-MM-DD')
    .isBetween(moment(startDate), moment(endDate), undefined, '[]'));

  /**
     *
     *
     * EXPENSE calculations for rentability
     *
     *
     */
  const usedExpenseCategories = [
    'assurance',
    'charges_copropriete',
    'frais_de_gestion',
    'frais_comptable',
    'frais_dpe',
    'remuneration_autre',
    'taxes_foncieres',
    'assurance_bien',
    'loyer_impaye',
    'mensualite_credit',
    'vacances_locatives',
  ];

  const expenses = result2?.filter((u) => {
    if (u && u.type === BudgetLineType.Expense
          // eslint-disable-next-line no-underscore-dangle
          && !u._deleted
          // check if current item is one of category in usedExpenseCategories
          && usedExpenseCategories.indexOf(u.category) > -1
          // && u.bankMouvementId
    ) {
      return true;
    }
    return false;
  });

  const allExpensesByCategory : {
    [key: string]: { count: number, total: number, freqExpense:number }
  } = {};

  /**
     *
     *
     * INCOME calculations for rentability
     *
     *
     */
  const usedIncomeCategories = [
    'loyer',
    'caf',
  ];

  const incomes = result2?.filter((u) => {
    if (u && u.type === BudgetLineType.Income
          // eslint-disable-next-line no-underscore-dangle
          && !u._deleted
          // check if current item is loyer or caf
          && usedIncomeCategories.indexOf(u.category) > -1
          && u.bankMouvementId
    ) {
      return true;
    }
    return false;
  });

  const allIncomesByCategory : {
    [key: string]: { count: number, total: number, freqIncome:number }
  } = {};

  if (incomes) {
    incomes.forEach((item) => {
      if (item) {
        /** If any expense doesnt exist */
        if (allIncomesByCategory[item?.category] === undefined) {
          /**
             * initial values and then calculate percentage starting from 0
             */
          let freqIncome = 12;
          switch (item?.frequency) {
            case 'quarterly':
              freqIncome = 4;
              break;
            case 'annual':
              freqIncome = 1;
              break;
            default:
              break;
          }
          allIncomesByCategory[item?.category] = {
            total: item?.amount - (item?.category === 'loyer' ? ((item?.managementFees || 0) + (item?.rentalCharges || 0)) : 0) || 0,
            count: 1,
            freqIncome,
          };
        } else {
          /** else If any expense exist then we add to allCurrentCategories variable */
          allIncomesByCategory[item?.category].total += item?.amount - (item?.category === 'loyer' ? ((item?.managementFees || 0) + (item?.rentalCharges || 0)) : 0) || 0;
          allIncomesByCategory[item?.category].count += 1;
        }
        if (item?.category === 'loyer') {
          // frais déduits du loyer
          if (allExpensesByCategory[`frais_${item?.category}`] === undefined) {
            /**
               * initial values and then calculate percentage starting from 0
               */
            let freqExpense = 12;
            switch (item?.frequency) {
              case 'quarterly':
                freqExpense = 4;
                break;
              case 'annual':
                freqExpense = 1;
                break;
              default:
                break;
            }
            allExpensesByCategory[`frais_${item?.category}`] = {
              total: item?.managementFees || 0,
              count: 1,
              freqExpense,
            };
          } else {
            /** else If any expense exist then we add to allCurrentCategories variable */
            allExpensesByCategory[`frais_${item?.category}`].total += item?.managementFees || 0;
            allExpensesByCategory[`frais_${item?.category}`].count += 1;
          }
        }
      }
    });
  }
  const totalIncomesInternal = Object.values(allIncomesByCategory).reduce(
    (total, category) => total + category.total * (category.freqIncome / category.count),
    0,
  );

  if (expenses) {
    expenses.forEach((item) => {
      if (item) {
        /** If any expense doesnt exist */
        if (allExpensesByCategory[item?.category] === undefined) {
          /**
             * initial values and then calculate percentage starting from 0
             */
          let freqExpense = 12;
          switch (item?.frequency) {
            case 'quarterly':
              freqExpense = 4;
              break;
            case 'annual':
              freqExpense = 1;
              break;
            default:
              break;
          }
          allExpensesByCategory[item?.category] = {
            total: (item?.category === 'mensualite_credit' ? item?.infoCredit?.assurance : item?.amount) || 0,
            count: 1,
            freqExpense,
          };
        } else {
          /** else If any expense exist then we add to allCurrentCategories variable */
          allExpensesByCategory[item?.category].total += item?.amount || 0;
          allExpensesByCategory[item?.category].count += 1;
        }
      }
    });
  }
  const totalExpensesInternal = Object.values(allExpensesByCategory).reduce(
    (total, category) => total + category.total * (category.freqExpense / category.count),
    0,
  );

  return Math.round(((totalIncomesInternal - totalExpensesInternal) / totalPrice) * 10000) / 100;
};

exports.handler = async () => {
  // on récupère toutes les real estate
  const list = await listRealEstates(AppSyncClient, {});

  if (list) {
    const map = list.map(async (realEstate) => {
      // eslint-disable-next-line no-underscore-dangle
      if (realEstate._deleted !== true && realEstate?.budgetLineDeadlines?.items) {
        // rentabilité du mois précédent
        const renta = getRentability(realEstate.budgetLineDeadlines.items,
          (realEstate?.purchasePrice || 0) + (realEstate?.notaryFee || 0));
        if (renta < 0) {
          // on envoie une notif
          lambda.invoke({
            FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
            Payload: JSON.stringify({
              userIds: realEstate.admins,
              title: 'Rentabilité en baisse',
              body: `La rentabilité de votre bien ${realEstate.name} est négative.`,
              data: {
                realEstateId: realEstate.id,
              },
              type: 'mauvaiseRenta',
            }, null, 2),
            InvocationType: 'Event',
          }, (error) => {
            if (error) {
              console.error('Notification error', error);
            }
          });
        } else {
          const rentaPrec = getRentability(realEstate.budgetLineDeadlines.items,
            (realEstate?.purchasePrice || 0) + (realEstate?.notaryFee || 0), -1);
          const variation = (renta - rentaPrec) / rentaPrec;
          if (variation <= -10) {
            // on envoie une notif
            lambda.invoke({
              FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
              Payload: JSON.stringify({
                userIds: realEstate.admins,
                title: 'Rentabilité en baisse',
                body: `La rentabilité de votre bien ${realEstate.name} est en baisse de ${variation.toPrecision(2).replace('.', ',')} %.`,
                data: {
                  realEstateId: realEstate.id,
                },
                type: 'mauvaiseRenta',
              }, null, 2),
              InvocationType: 'Event',
            }, (error) => {
              if (error) {
                console.error('Notification error', error);
              }
            });
          }
        }
      }
    });
    await Promise.all(map);
  }

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Done!'),
  };
  return response;
};
