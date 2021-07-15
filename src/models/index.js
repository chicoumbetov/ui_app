// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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
  "BIANNUALLY": "biannually",
  "QUARTERLY": "quarterly",
  "ANNUAL": "annual"
};

const RentalType = {
  "FURNISHED": "furnished",
  "UNFURNISHED": "unfurnished"
};

const BankMovementStatus = {
  "UNKOWN": "Unkown",
  "AFFECTED": "Affected",
  "IGNORED": "Ignored"
};

const InvitationType = {
  "ADMIN": "Admin",
  "READ_ONLY": "ReadOnly"
};

const SubscriptionType = {
  "TRIAL": "Trial",
  "ONE_TO_TWO": "OneToTwo",
  "THREE_TO_FIVE": "ThreeToFive",
  "MORE_THAN_FIVE": "MoreThanFive",
  "ONE_TO_TWO_ANNUAL": "OneToTwoAnnual",
  "THREE_TO_FIVE_ANNUAL": "ThreeToFiveAnnual",
  "MORE_THAN_FIVE_ANNUAL": "MoreThanFiveAnnual"
};

const { BankAccount, RealEstateBankAccount, RealEstate, BankMovement, BudgetLineDeadline, BudgetLine, Document, PendingInvitation, User, BillingHistory, Notification, NotificationTickets, Address, MortgageLoanInfo, AmortizationTable, MortgageLoanDeadlineInfo, TenantInfo, ProfileInfo, NotificationParams, NotificationParam, UserToken } = initSchema(schema);

export {
  BankAccount,
  RealEstateBankAccount,
  RealEstate,
  BankMovement,
  BudgetLineDeadline,
  BudgetLine,
  Document,
  PendingInvitation,
  User,
  BillingHistory,
  Notification,
  NotificationTickets,
  RealEstateType,
  CompanyType,
  TaxType,
  BudgetLineType,
  Frequency,
  RentalType,
  BankMovementStatus,
  InvitationType,
  SubscriptionType,
  Address,
  MortgageLoanInfo,
  AmortizationTable,
  MortgageLoanDeadlineInfo,
  TenantInfo,
  ProfileInfo,
  NotificationParams,
  NotificationParam,
  UserToken
};
