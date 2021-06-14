import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SubscriptionType {
  ONE_TO_TWO = "OneToTwo",
  TREE_TO_FIVE = "TreeToFive",
  MORE_THAN_FIVE = "MoreThanFive"
}

export enum RealEstateType {
  MAIN_HOME = "mainHome",
  SECOND_HOME = "secondHome",
  PROFESSIONNAL_RENTAL_INVESTMENT = "professionnalRentalInvestment",
  PRIVATE_RENTAL_INVESTMENT = "privateRentalInvestment"
}

export enum CompanyType {
  SCI = "SCI",
  SAS = "SAS",
  SAR_LCLASSIQUE = "SARLclassique",
  SAR_LFAMILLE = "SARLfamille"
}

export enum TaxType {
  REVENUE_TAX = "RevenueTax",
  SOCIAL_TAX = "SocialTax"
}

export enum BudgetLineType {
  EXPENSE = "Expense",
  INCOME = "Income"
}

export enum Frequency {
  MONTHLY = "monthly",
  FORTNIGHTLY = "fortnightly",
  QUARTERLY = "quarterly",
  ANNUAL = "annual"
}

export enum InvitationType {
  ADMIN = "Admin",
  READ_ONLY = "ReadOnly"
}

export declare class ProfileInfo {
  readonly phoneNumber?: string;
  readonly optIn?: boolean;
  readonly address?: Address;
  readonly birthDate?: string;
  readonly subscription?: SubscriptionType | keyof typeof SubscriptionType;
  constructor(init: ModelInit<ProfileInfo>);
}

export declare class Address {
  readonly address: string;
  readonly additionalAddress?: string;
  readonly postalCode: string;
  readonly city: string;
  readonly country: string;
  constructor(init: ModelInit<Address>);
}

export declare class MortgageLoanInfo {
  readonly borrowedCapital: number;
  readonly loadStartDate?: string;
  readonly duration?: number;
  readonly interestRate?: number;
  readonly assuranceRate?: number;
  readonly amortizationTable?: (AmortizationTable | null)[];
  constructor(init: ModelInit<MortgageLoanInfo>);
}

export declare class AmortizationTable {
  readonly dueDate?: string;
  readonly amount?: number;
  readonly interest?: number;
  readonly assurance?: number;
  readonly amortizedCapital?: number;
  constructor(init: ModelInit<AmortizationTable>);
}

export declare class MortgageLoanDeadlineInfo {
  readonly amount?: number;
  readonly interest?: number;
  readonly assurance?: number;
  constructor(init: ModelInit<MortgageLoanDeadlineInfo>);
}

export declare class TenantInfo {
  readonly id: string;
  readonly amount: number;
  readonly rentalCharges?: number;
  readonly managementFees?: number;
  readonly lastname: string;
  readonly firstname: string;
  readonly email: string;
  readonly startDate: string;
  readonly endDate?: string;
  constructor(init: ModelInit<TenantInfo>);
}

export declare class User {
  readonly id: string;
  readonly lastname?: string;
  readonly firstname?: string;
  readonly avatarUri?: string;
  readonly email?: string;
  readonly privateProfile?: ProfileInfo;
  readonly expoToken?: string[];
  readonly biUser?: string;
  readonly biToken?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class RealEstate {
  readonly id: string;
  readonly name: string;
  readonly iconUri: string;
  readonly purchaseYear?: number;
  readonly type?: RealEstateType | keyof typeof RealEstateType;
  readonly ownName?: boolean;
  readonly company?: CompanyType | keyof typeof CompanyType;
  readonly detentionPart?: number;
  readonly typeImpot?: TaxType | keyof typeof TaxType;
  readonly budgetLines?: (BudgetLine | null)[];
  readonly bankMovements?: (BankMovement | null)[];
  readonly budgetLineDeadlines?: (BudgetLineDeadline | null)[];
  readonly documents?: (Document | null)[];
  readonly admins: string[];
  readonly shared?: string[];
  readonly pendingInvitations?: (PendingInvitation | null)[];
  readonly address?: Address;
  readonly tenants?: (TenantInfo | null)[];
  readonly bankAccounts?: (RealEstateBankAccount | null)[];
  constructor(init: ModelInit<RealEstate>);
  static copyOf(source: RealEstate, mutator: (draft: MutableModel<RealEstate>) => MutableModel<RealEstate> | void): RealEstate;
}

export declare class BudgetLine {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly type: BudgetLineType | keyof typeof BudgetLineType;
  readonly category: string;
  readonly amount: number;
  readonly frequency: Frequency | keyof typeof Frequency;
  readonly nextDueDate?: string;
  readonly infoCredit?: MortgageLoanInfo;
  readonly tenantId?: string;
  constructor(init: ModelInit<BudgetLine>);
  static copyOf(source: BudgetLine, mutator: (draft: MutableModel<BudgetLine>) => MutableModel<BudgetLine> | void): BudgetLine;
}

export declare class BankMovement {
  readonly id: string;
  readonly bankAccount: BankAccount;
  readonly realEstate?: RealEstate;
  readonly biId: number;
  readonly description?: string;
  readonly amount: number;
  readonly budgetLineDeadlineId?: (string | null)[];
  readonly budgetLineDeadline?: (BudgetLineDeadline | null)[];
  readonly ignored?: boolean;
  readonly date?: string;
  constructor(init: ModelInit<BankMovement>);
  static copyOf(source: BankMovement, mutator: (draft: MutableModel<BankMovement>) => MutableModel<BankMovement> | void): BankMovement;
}

export declare class BankAccount {
  readonly id: string;
  readonly realEstates?: (RealEstateBankAccount | null)[];
  readonly bank?: string;
  readonly accountOwner?: string;
  readonly name?: string;
  readonly iban?: string;
  readonly bic?: string;
  readonly balance: number;
  readonly biId: number;
  readonly biConnectionId: number;
  readonly biState?: string;
  readonly movements?: (BankMovement | null)[];
  constructor(init: ModelInit<BankAccount>);
  static copyOf(source: BankAccount, mutator: (draft: MutableModel<BankAccount>) => MutableModel<BankAccount> | void): BankAccount;
}

export declare class RealEstateBankAccount {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly bankAccount: BankAccount;
  constructor(init: ModelInit<RealEstateBankAccount>);
  static copyOf(source: RealEstateBankAccount, mutator: (draft: MutableModel<RealEstateBankAccount>) => MutableModel<RealEstateBankAccount> | void): RealEstateBankAccount;
}

export declare class BudgetLineDeadline {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly bankMouvement?: BankMovement;
  readonly budgetLineId: string;
  readonly budgetLine?: BudgetLine;
  readonly type: BudgetLineType | keyof typeof BudgetLineType;
  readonly category: string;
  readonly amount: number;
  readonly frequency: Frequency | keyof typeof Frequency;
  readonly date?: string;
  readonly infoCredit?: MortgageLoanDeadlineInfo;
  readonly tenantId?: string;
  constructor(init: ModelInit<BudgetLineDeadline>);
  static copyOf(source: BudgetLineDeadline, mutator: (draft: MutableModel<BudgetLineDeadline>) => MutableModel<BudgetLineDeadline> | void): BudgetLineDeadline;
}

export declare class Document {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly name: string;
  readonly key?: string;
  readonly s3file: string;
  constructor(init: ModelInit<Document>);
  static copyOf(source: Document, mutator: (draft: MutableModel<Document>) => MutableModel<Document> | void): Document;
}

export declare class PendingInvitation {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly email: string;
  readonly type: InvitationType | keyof typeof InvitationType;
  constructor(init: ModelInit<PendingInvitation>);
  static copyOf(source: PendingInvitation, mutator: (draft: MutableModel<PendingInvitation>) => MutableModel<PendingInvitation> | void): PendingInvitation;
}

export declare class Notification {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly category: string;
  readonly text: string;
  readonly params?: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Notification>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

export declare class BillingHistory {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly date: string;
  readonly nextRenewDate?: string;
  readonly subscription?: SubscriptionType | keyof typeof SubscriptionType;
  readonly amount: number;
  readonly paid?: boolean;
  constructor(init: ModelInit<BillingHistory>);
  static copyOf(source: BillingHistory, mutator: (draft: MutableModel<BillingHistory>) => MutableModel<BillingHistory> | void): BillingHistory;
}

export declare class NotificationReceipts {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly expoToken: string;
  readonly receiptId: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<NotificationReceipts>);
  static copyOf(source: NotificationReceipts, mutator: (draft: MutableModel<NotificationReceipts>) => MutableModel<NotificationReceipts> | void): NotificationReceipts;
}

export declare class NotificationReceipts {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly expoToken: string;
  readonly receiptId: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<NotificationReceipts>);
  static copyOf(source: NotificationReceipts, mutator: (draft: MutableModel<NotificationReceipts>) => MutableModel<NotificationReceipts> | void): NotificationReceipts;
}
