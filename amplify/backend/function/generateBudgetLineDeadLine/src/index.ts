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
  CreateBudgetLineDeadlineInput,
  MortgageLoanDeadlineInfoInput,
} from '../../../../../src/API';
import DateUtils from './DateUtils';
import * as moment from 'moment';

const aws = require('aws-sdk');

const lambda = new aws.Lambda({
  region: process.env.REGION,
});

enum BudgetLineType {
  Expense = 'Expense',
  Income = 'Income',
}

const AppSyncClient = getAppSyncClient(process.env);

exports.handler = async () => {
  // on récupère toutes les budget line
  const date = new Date();
  const currentDate = date.toISOString().substr(0, 10);
  date.setDate(date.getDate() + 3);
  const currentDatePlus3Days = date.toISOString().substr(0, 10);
  const list = await listBudgetLines(AppSyncClient, currentDate, currentDatePlus3Days);

  if (list) {
    const map = list.map(async (budgetLine) => {
      // eslint-disable-next-line no-underscore-dangle
      if (budgetLine._deleted !== true) {
        const {
          realEstateId,
          id,
          type,
          category,
          amount,
          frequency,
          tenantId,
          rentalCharges,
          managementFees,
          householdWaste,
          infoCredit: budgetLineInfoCredit,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _version,
        } = budgetLine;

        let infoCredit: MortgageLoanDeadlineInfoInput | null = null;
        let nextDueDate: string | null | undefined;
        if (budgetLineInfoCredit && budgetLineInfoCredit.amortizationTable) {
          // on cherche les infos de l'échéance actuelle
          const currentIndex = budgetLineInfoCredit.amortizationTable.findIndex(
            (item) => item.dueDate === budgetLine.nextDueDate,
          );
          if (currentIndex > -1) {
            infoCredit = {
              amount: budgetLineInfoCredit.amortizationTable[currentIndex].amount,
              interest: budgetLineInfoCredit.amortizationTable[currentIndex].interest,
              assurance: budgetLineInfoCredit.amortizationTable[currentIndex].assurance,
            };

            // on récupère la prochaine date d'échéance
            if (currentIndex < budgetLineInfoCredit.amortizationTable.length - 1) {
              nextDueDate = budgetLineInfoCredit.amortizationTable[currentIndex + 1].dueDate;
            } else {
              // le crédit est fini, on passe la date à null car il n'y a plus d'échéance suivante
              nextDueDate = null;
            }
          }
        }
        // on creer la budgetLineDeadline
        const newBudgetLineDeadline: CreateBudgetLineDeadlineInput = {
          realEstateId,
          budgetLineId: id,
          type,
          category,
          amount,
          frequency,
          date: budgetLine.nextDueDate,
          infoCredit,
          tenantId,
          rentalCharges,
          managementFees,
          householdWaste,
        };

        await createBudgetLineDeadline(AppSyncClient, newBudgetLineDeadline);

        const oldDueDate = budgetLine.nextDueDate;
        // on calcule la prochaine échéance
        if (nextDueDate === undefined) {
          nextDueDate = DateUtils.addMonths(
            budgetLine.nextDueDate,
            DateUtils.frequencyToMonths(frequency),
          );
        }

        // on envoie une notif
        if (budgetLine.type === BudgetLineType.Expense) {
          lambda.invoke({
            FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
            Payload: JSON.stringify({
              userIds: budgetLine.realEstate.admins,
              title: 'Nouvelle dépense',
              body: `Une dépense pour votre bien ${budgetLine.realEstate.name} arrive à échéance le ${moment(oldDueDate).format('DD/MM/YYYY')}.`,
              data: {
                realEstateId: budgetLine.realEstateId,
                budgetLineId: budgetLine.id,
              },
              type: 'echeanceFacture',
            }, null, 2),
            InvocationType: 'Event',
          }, (error) => {
            if (error) {
              console.error('Notification error', error);
            }
          });
        }

        // on update la budgetLine
        await updateBudgetLine(AppSyncClient, {
          id,
          nextDueDate,
          _version,
        });
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
