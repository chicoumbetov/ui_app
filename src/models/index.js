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

const TaxType = {
  "REVENUE_TAX": "RevenueTax",
  "SOCIAL_TAX": "SocialTax"
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

const { User, RealEstate, BudgetLine, BankMovement, BankAccount, RealEstateBankAccount, BudgetLineDeadline, Document, Notification, BillingHistory, ProfileInfo, Address, MortgageLoanInfo, AmortizationTable, MortgageLoanDeadlineInfo, TenantInfo, PendingInvitation } = initSchema(schema);

export {
  User,
  RealEstate,
  BudgetLine,
  BankMovement,
  BankAccount,
  RealEstateBankAccount,
  BudgetLineDeadline,
  Document,
  Notification,
  BillingHistory,
  SubscriptionType,
  RealEstateType,
  CompanyType,
  TaxType,
  BudgetLineType,
  Frequency,
  InvitationType,
  ProfileInfo,
  Address,
  MortgageLoanInfo,
  AmortizationTable,
  MortgageLoanDeadlineInfo,
  TenantInfo,
  PendingInvitation
};