/* Amplify Params - DO NOT EDIT
	API_OMEDOM_BANKACCOUNTTABLE_ARN
	API_OMEDOM_BANKACCOUNTTABLE_NAME
	API_OMEDOM_BANKMOVEMENTTABLE_ARN
	API_OMEDOM_BANKMOVEMENTTABLE_NAME
	API_OMEDOM_BUDGETLINEDEADLINETABLE_ARN
	API_OMEDOM_BUDGETLINEDEADLINETABLE_NAME
	API_OMEDOM_BUDGETLINETABLE_ARN
	API_OMEDOM_BUDGETLINETABLE_NAME
	API_OMEDOM_DOCUMENTTABLE_ARN
	API_OMEDOM_DOCUMENTTABLE_NAME
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	API_OMEDOM_NOTIFICATIONTICKETSTABLE_ARN
	API_OMEDOM_NOTIFICATIONTICKETSTABLE_NAME
	API_OMEDOM_PENDINGINVITATIONTABLE_ARN
	API_OMEDOM_PENDINGINVITATIONTABLE_NAME
	API_OMEDOM_REALESTATEBANKACCOUNTTABLE_ARN
	API_OMEDOM_REALESTATEBANKACCOUNTTABLE_NAME
	API_OMEDOM_REALESTATETABLE_ARN
	API_OMEDOM_REALESTATETABLE_NAME
	API_OMEDOM_USERTABLE_ARN
	API_OMEDOM_USERTABLE_NAME
	AUTH_OMEDOMC071F696_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const authorizerBankAccount = require('./functions/AuthorizerBankAccount');
const authorizerBankMovement = require('./functions/AuthorizerBankMovement');
const authorizerBudgetLine = require('./functions/AuthorizerBudgetLine');
const authorizerBudgetLineDeadline = require('./functions/AuthorizerBudgetLineDeadline');
const authorizerDocument = require('./functions/AuthorizerDocument');
const authorizerRealEstateBankAccount = require('./functions/AuthorizerRealEstateBankAccount');

exports.handler = async (event) => {
  if (event.identity.userArn && event.identity.userArn.indexOf('arn:aws:iam') > -1) {
    return event.prev.result;
  }
  const authorizationTypes = {
    getBankAccount: () => authorizerBankAccount(event, ['admins', 'shared']),
    updateBankAccount: () => authorizerBankAccount(event, ['admins']),
    deleteBankAccount: () => authorizerBankAccount(event, ['admins']),

    getBankMovement: () => authorizerBankMovement(event, ['admins', 'shared']),
    updateBankMovement: () => authorizerBankMovement(event, ['admins']),
    deleteBankMovement: () => authorizerBankMovement(event, ['admins']),
    onCreateBankMovement: () => authorizerBankMovement(event, ['admins', 'shared']),
    onUpdateBankMovement: () => authorizerBankMovement(event, ['admins', 'shared']),

    getBudgetLine: () => authorizerBudgetLine(event, ['admins', 'shared']),
    updateBudgetLine: () => authorizerBudgetLine(event, ['admins']),
    deleteBudgetLine: () => authorizerBudgetLine(event, ['admins']),
    onCreateBudgetLine: () => authorizerBudgetLine(event, ['admins', 'shared']),
    onUpdateBudgetLine: () => authorizerBudgetLine(event, ['admins', 'shared']),

    getBudgetLineDeadline: () => authorizerBudgetLineDeadline(event, ['admins', 'shared']),
    updateBudgetLineDeadline: () => authorizerBudgetLineDeadline(event, ['admins']),
    deleteBudgetLineDeadline: () => authorizerBudgetLineDeadline(event, ['admins']),
    onCreateBudgetLineDeadline: () => authorizerBudgetLineDeadline(event, ['admins', 'shared']),
    onUpdateBudgetLineDeadline: () => authorizerBudgetLineDeadline(event, ['admins', 'shared']),

    getDocument: () => authorizerDocument(event, ['admins', 'shared']),
    updateDocument: () => authorizerDocument(event, ['admins']),
    deleteDocument: () => authorizerDocument(event, ['admins']),
    onCreateDocument: () => authorizerDocument(event, ['admins', 'shared']),
    onUpdateDocument: () => authorizerDocument(event, ['admins', 'shared']),

    getRealEstateBankAccount: () => authorizerRealEstateBankAccount(event, ['admins']),
    updateRealEstateBankAccount: () => authorizerRealEstateBankAccount(event, ['admins']),
    deleteRealEstateBankAccount: () => authorizerRealEstateBankAccount(event, ['admins']),
    onCreateRealEstateBankAccount: () => authorizerRealEstateBankAccount(event, ['admins', 'shared']),
    onUpdateRealEstateBankAccount: () => authorizerRealEstateBankAccount(event, ['admins', 'shared']),
  };

  const isAuthorized = await authorizationTypes[event.fieldName]();
  console.log(`Operation ${event.fieldName} is authorized: ${isAuthorized}`);
  if (!isAuthorized) {
    return { unauthorized: true };
  }

  return event.prev.result;
};
