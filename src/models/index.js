// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SubscriptionType = {
  "ONE_TO_TWO": "OneToTwo",
  "TREE_TO_FIVE": "TreeToFive",
  "MORE_THAN_FIVE": "MoreThanFive"
};

const RealEstateType = {
  "MAIN_HOME": "mainHome",
  "SECOND_HOME": "secondHome",
  "PROFESSIONNAL_RENTAL_INVESTMENT": "professionnalRentalInvestment",
  "PRIVATE_RENTAL_INVESTMENT": "privateRentalInvestment"
};

const CompanyType = {
  "SCI": "SCI",
  "SAS": "SAS",
  "SAR_LCLASSIQUE": "SARLclassique",
  "SAR_LFAMILLE": "SARLfamille"
};

const BudgetLineType = {
  "EXPENSE": "Expense",
  "INCOME": "Income"
};

const Frequency = {
  "MONTHLY": "monthly",
  "FORTNIGHTLY": "fortnightly",
  "QUARTERLY": "quarterly",
  "ANNUAL": "annual"
};

const InvitationType = {
  "ADMIN": "Admin",
  "READ_ONLY": "ReadOnly"
};

const { User, RealEstate, BudgetLine, Document, RealEstateBankAccount, BankAccount, BankMovement, Notification, BillingHistory, Address, MortgageLoanInfo, AmortizationTable, TenantInfo, PendingInvitation } = initSchema(schema);

export {
  User,
  RealEstate,
  BudgetLine,
  Document,
  RealEstateBankAccount,
  BankAccount,
  BankMovement,
  Notification,
  BillingHistory,
  SubscriptionType,
  RealEstateType,
  CompanyType,
  BudgetLineType,
  Frequency,
  InvitationType,
  Address,
  MortgageLoanInfo,
  AmortizationTable,
  TenantInfo,
  PendingInvitation
};