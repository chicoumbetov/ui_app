import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

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

export enum RentalType {
  FURNISHED = "furnished",
  UNFURNISHED = "unfurnished"
}

export enum BankMovementStatus {
  UNKOWN = "Unkown",
  AFFECTED = "Affected",
  IGNORED = "Ignored"
}

export enum InvitationType {
  ADMIN = "Admin",
  READ_ONLY = "ReadOnly"
}

export enum SubscriptionType {
  TRIAL = "Trial",
  ONE_TO_TWO = "OneToTwo",
  THREE_TO_FIVE = "ThreeToFive",
  MORE_THAN_FIVE = "MoreThanFive",
  ONE_TO_TWO_ANNUAL = "OneToTwoAnnual",
  THREE_TO_FIVE_ANNUAL = "ThreeToFiveAnnual",
  MORE_THAN_FIVE_ANNUAL = "MoreThanFiveAnnual"
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
  readonly loanStartDate?: string;
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
  readonly lastname: string;
  readonly firstname: string;
  readonly rentalType?: RentalType | keyof typeof RentalType;
  readonly email: string;
  readonly startDate: string;
  readonly endDate?: string;
  constructor(init: ModelInit<TenantInfo>);
}

export declare class ProfileInfo {
  readonly phoneNumber?: string;
  readonly optIn?: boolean;
  readonly address?: Address;
  readonly birthDate?: string;
  readonly notificationParams?: NotificationParams;
  readonly notificationLastSeenAt?: string;
  constructor(init: ModelInit<ProfileInfo>);
}

export declare class NotificationParams {
  readonly echeanceFacture?: NotificationParam;
  readonly loyer?: NotificationParam;
  readonly debitBancaire?: NotificationParam;
  readonly creditBancaire?: NotificationParam;
  readonly soldeNegatif?: NotificationParam;
  readonly retardLoyer?: NotificationParam;
  readonly mauvaiseRenta?: NotificationParam;
  readonly autre?: NotificationParam;
  constructor(init: ModelInit<NotificationParams>);
}

export declare class NotificationParam {
  readonly push?: boolean;
  readonly email?: boolean;
  constructor(init: ModelInit<NotificationParam>);
}

export declare class UserToken {
  readonly userId: string;
  readonly token: string;
  constructor(init: ModelInit<UserToken>);
}

export declare class BankAccount {
  readonly id: string;
  readonly bank?: string;
  readonly name?: string;
  readonly iban?: string;
  readonly bic?: string;
  readonly balance: number;
  readonly biId: number;
  readonly biConnectionId: number;
  readonly biState?: string;
  readonly realEstates?: (RealEstateBankAccount | null)[];
  readonly movements?: (BankMovement | null)[];
  readonly accountOwner?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BankAccount>);
  static copyOf(source: BankAccount, mutator: (draft: MutableModel<BankAccount>) => MutableModel<BankAccount> | void): BankAccount;
}

export declare class RealEstateBankAccount {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly bankAccount: BankAccount;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RealEstateBankAccount>);
  static copyOf(source: RealEstateBankAccount, mutator: (draft: MutableModel<RealEstateBankAccount>) => MutableModel<RealEstateBankAccount> | void): RealEstateBankAccount;
}

export declare class RealEstate {
  readonly id: string;
  readonly name: string;
  readonly iconUri: string;
  readonly purchaseYear?: number;
  readonly type?: RealEstateType | keyof typeof RealEstateType;
  readonly ownName?: boolean;
  readonly company?: CompanyType | keyof typeof CompanyType;
  readonly address?: Address;
  readonly detentionPart?: number;
  readonly typeImpot?: TaxType | keyof typeof TaxType;
  readonly purchasePrice?: number;
  readonly notaryFee?: number;
  readonly bankAccounts?: (RealEstateBankAccount | null)[];
  readonly bankMovements?: (BankMovement | null)[];
  readonly budgetLines?: (BudgetLine | null)[];
  readonly budgetLineDeadlines?: (BudgetLineDeadline | null)[];
  readonly documents?: (Document | null)[];
  readonly admins: string[];
  readonly shared?: string[];
  readonly pendingInvitations?: (PendingInvitation | null)[];
  readonly tenants?: (TenantInfo | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RealEstate>);
  static copyOf(source: RealEstate, mutator: (draft: MutableModel<RealEstate>) => MutableModel<RealEstate> | void): RealEstate;
}

export declare class BankMovement {
  readonly id: string;
  readonly bankAccount: BankAccount;
  readonly realEstate?: RealEstate;
  readonly biId: number;
  readonly description?: string;
  readonly amount: number;
  readonly budgetLineDeadlines?: (BudgetLineDeadline | null)[];
  readonly status?: BankMovementStatus | keyof typeof BankMovementStatus;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BankMovement>);
  static copyOf(source: BankMovement, mutator: (draft: MutableModel<BankMovement>) => MutableModel<BankMovement> | void): BankMovement;
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
  readonly rentalCharges?: number;
  readonly managementFees?: number;
  readonly householdWaste?: number;
  readonly rentalType?: RentalType | keyof typeof RentalType;
  readonly frequency: Frequency | keyof typeof Frequency;
  readonly date?: string;
  readonly infoCredit?: MortgageLoanDeadlineInfo;
  readonly tenantId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BudgetLineDeadline>);
  static copyOf(source: BudgetLineDeadline, mutator: (draft: MutableModel<BudgetLineDeadline>) => MutableModel<BudgetLineDeadline> | void): BudgetLineDeadline;
}

export declare class BudgetLine {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly type: BudgetLineType | keyof typeof BudgetLineType;
  readonly category: string;
  readonly amount: number;
  readonly rentalCharges?: number;
  readonly managementFees?: number;
  readonly householdWaste?: number;
  readonly frequency: Frequency | keyof typeof Frequency;
  readonly nextDueDate: string;
  readonly rentalType?: RentalType | keyof typeof RentalType;
  readonly infoCredit?: MortgageLoanInfo;
  readonly tenantId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BudgetLine>);
  static copyOf(source: BudgetLine, mutator: (draft: MutableModel<BudgetLine>) => MutableModel<BudgetLine> | void): BudgetLine;
}

export declare class Document {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly name: string;
  readonly key?: string;
  readonly s3file: string;
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Document>);
  static copyOf(source: Document, mutator: (draft: MutableModel<Document>) => MutableModel<Document> | void): Document;
}

export declare class PendingInvitation {
  readonly id: string;
  readonly realEstate?: RealEstate;
  readonly email: string;
  readonly type: InvitationType | keyof typeof InvitationType;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PendingInvitation>);
  static copyOf(source: PendingInvitation, mutator: (draft: MutableModel<PendingInvitation>) => MutableModel<PendingInvitation> | void): PendingInvitation;
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
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class BillingHistory {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly createdAt: string;
  readonly nextRenewDate: string;
  readonly subscription?: SubscriptionType | keyof typeof SubscriptionType;
  readonly amount: number;
  readonly paid?: boolean;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BillingHistory>);
  static copyOf(source: BillingHistory, mutator: (draft: MutableModel<BillingHistory>) => MutableModel<BillingHistory> | void): BillingHistory;
}

export declare class Notification {
  readonly id: string;
  readonly userId: string;
  readonly user?: User;
  readonly type: string;
  readonly title: string;
  readonly body: string;
  readonly data?: string;
  readonly clicked?: boolean;
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Notification>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

export declare class NotificationTickets {
  readonly id: string;
  readonly expoTokens?: UserToken[];
  readonly ticketIds?: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<NotificationTickets>);
  static copyOf(source: NotificationTickets, mutator: (draft: MutableModel<NotificationTickets>) => MutableModel<NotificationTickets> | void): NotificationTickets;
}