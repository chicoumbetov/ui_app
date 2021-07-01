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

const AppSyncClient = getAppSyncClient(process.env);

exports.handler = async () => {
  // on récupère toutes les budget line
  const currentDate = (new Date()).toISOString().substr(0, 10);
  const list = await listBudgetLines(AppSyncClient, currentDate, currentDate);

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
        if (budgetLineInfoCredit) {
          // on cherche les infos de l'échéance actuelle
          const currentIndex = budgetLineInfoCredit.amortizationTable.findIndex(
            (item) => item.dueDate === currentDate,
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
          date: currentDate,
          infoCredit,
          tenantId,
          rentalCharges,
          managementFees,
          householdWaste,
        };

        await createBudgetLineDeadline(AppSyncClient, newBudgetLineDeadline);

        // on calcule la prochaine échéance
        if (nextDueDate === undefined) {
          nextDueDate = DateUtils.addMonths(currentDate, DateUtils.frequencyToMonths(frequency));
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
