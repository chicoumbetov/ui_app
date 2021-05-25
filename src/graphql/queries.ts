/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncDocuments = /* GraphQL */ `
  query SyncDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocuments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstateId
        name
        s3file
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      realEstateId
      name
      s3file
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        budgetLines {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        admins
        shared
        pendingInvitations
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          rentalCharges
          managementFees
          lastname
          firstname
          email
          startDate
          endDate
        }
        bankAccounts {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        realEstateId
        name
        s3file
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBudgetLines = /* GraphQL */ `
  query SyncBudgetLines(
    $filter: ModelBudgetLineFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBudgetLines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstateId
        type
        category
        amount
        frequency
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
        tenantId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getBudgetLine = /* GraphQL */ `
  query GetBudgetLine($id: ID!) {
    getBudgetLine(id: $id) {
      id
      realEstateId
      type
      category
      amount
      frequency
      nextDueDate
      infoCredit {
        borrowedCapital
        loadStartDate
        duration
        interestRate
        assuranceRate
        amortizationTable {
          dueDate
          amount
          interest
          assurance
          amortizedCapital
        }
      }
      tenantId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        budgetLines {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        admins
        shared
        pendingInvitations
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          rentalCharges
          managementFees
          lastname
          firstname
          email
          startDate
          endDate
        }
        bankAccounts {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const listBudgetLines = /* GraphQL */ `
  query ListBudgetLines(
    $filter: ModelBudgetLineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBudgetLines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        realEstateId
        type
        category
        amount
        frequency
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
        tenantId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRealEstateBankAccounts = /* GraphQL */ `
  query SyncRealEstateBankAccounts(
    $filter: ModelRealEstateBankAccountFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRealEstateBankAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstateId
        bankAccountId
        bankAccount {
          id
          bank
          accountOwner
          iban
          bic
          balance
          bridgetApiAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBankAccounts = /* GraphQL */ `
  query SyncBankAccounts(
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBankAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstates {
          nextToken
          startedAt
        }
        bank
        accountOwner
        iban
        bic
        balance
        bridgetApiAccountId
        movements {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBankAccount = /* GraphQL */ `
  query GetBankAccount($id: ID!) {
    getBankAccount(id: $id) {
      id
      realEstates {
        items {
          id
          realEstateId
          bankAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      bank
      accountOwner
      iban
      bic
      balance
      bridgetApiAccountId
      movements {
        items {
          id
          bankAccountId
          realEstateId
          bridgetApiId
          description
          amount
          budgetLineId
          ignored
          date
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBankAccounts = /* GraphQL */ `
  query ListBankAccounts(
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        realEstates {
          nextToken
          startedAt
        }
        bank
        accountOwner
        iban
        bic
        balance
        bridgetApiAccountId
        movements {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBankMovements = /* GraphQL */ `
  query SyncBankMovements(
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBankMovements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        bankAccountId
        bankAccount {
          id
          bank
          accountOwner
          iban
          bic
          balance
          bridgetApiAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        realEstateId
        realEstate {
          id
          bank
          accountOwner
          iban
          bic
          balance
          bridgetApiAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bridgetApiId
        description
        amount
        budgetLineId
        budgetLine {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        ignored
        date
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBankMovement = /* GraphQL */ `
  query GetBankMovement($id: ID!) {
    getBankMovement(id: $id) {
      id
      bankAccountId
      bankAccount {
        id
        realEstates {
          nextToken
          startedAt
        }
        bank
        accountOwner
        iban
        bic
        balance
        bridgetApiAccountId
        movements {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      realEstateId
      realEstate {
        id
        realEstates {
          nextToken
          startedAt
        }
        bank
        accountOwner
        iban
        bic
        balance
        bridgetApiAccountId
        movements {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      bridgetApiId
      description
      amount
      budgetLineId
      budgetLine {
        id
        realEstateId
        type
        category
        amount
        frequency
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
        tenantId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          typeImpot
          admins
          shared
          pendingInvitations
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      ignored
      date
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBankMovements = /* GraphQL */ `
  query ListBankMovements(
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bankAccountId
        bankAccount {
          id
          bank
          accountOwner
          iban
          bic
          balance
          bridgetApiAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        realEstateId
        realEstate {
          id
          bank
          accountOwner
          iban
          bic
          balance
          bridgetApiAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bridgetApiId
        description
        amount
        budgetLineId
        budgetLine {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        ignored
        date
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        lastname
        firstname
        avatarUri
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        email
        phoneNumber
        optIn
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        birthDate
        subscription
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      lastname
      firstname
      avatarUri
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      email
      phoneNumber
      optIn
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      birthDate
      subscription
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastname
        firstname
        avatarUri
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        email
        phoneNumber
        optIn
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        birthDate
        subscription
      }
      nextToken
      startedAt
    }
  }
`;
export const listRealEstates = /* GraphQL */ `
  query ListRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        budgetLines {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        admins
        shared
        pendingInvitations
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          rentalCharges
          managementFees
          lastname
          firstname
          email
          startDate
          endDate
        }
        bankAccounts {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRealEstate = /* GraphQL */ `
  query GetRealEstate($id: ID!) {
    getRealEstate(id: $id) {
      id
      name
      iconUri
      purchaseYear
      type
      ownName
      company
      detentionPart
      typeImpot
      budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      documents {
        items {
          id
          realEstateId
          name
          s3file
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      admins
      shared
      pendingInvitations
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      tenants {
        id
        amount
        rentalCharges
        managementFees
        lastname
        firstname
        email
        startDate
        endDate
      }
      bankAccounts {
        items {
          id
          realEstateId
          bankAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const syncRealEstates = /* GraphQL */ `
  query SyncRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRealEstates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        budgetLines {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        admins
        shared
        pendingInvitations
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          rentalCharges
          managementFees
          lastname
          firstname
          email
          startDate
          endDate
        }
        bankAccounts {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      owner
      userId
      category
      text
      params
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        lastname
        firstname
        avatarUri
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        email
        phoneNumber
        optIn
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        birthDate
        subscription
      }
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        userId
        category
        text
        params
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        user {
          id
          lastname
          firstname
          avatarUri
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          email
          phoneNumber
          optIn
          birthDate
          subscription
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner
        userId
        category
        text
        params
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        user {
          id
          lastname
          firstname
          avatarUri
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          email
          phoneNumber
          optIn
          birthDate
          subscription
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getBillingHistory = /* GraphQL */ `
  query GetBillingHistory($id: ID!) {
    getBillingHistory(id: $id) {
      id
      owner
      userId
      date
      nextRenewDate
      subscription
      amount
      paid
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        lastname
        firstname
        avatarUri
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        email
        phoneNumber
        optIn
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        birthDate
        subscription
      }
    }
  }
`;
export const listBillingHistorys = /* GraphQL */ `
  query ListBillingHistorys(
    $filter: ModelBillingHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBillingHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        userId
        date
        nextRenewDate
        subscription
        amount
        paid
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        user {
          id
          lastname
          firstname
          avatarUri
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          email
          phoneNumber
          optIn
          birthDate
          subscription
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBillingHistories = /* GraphQL */ `
  query SyncBillingHistories(
    $filter: ModelBillingHistoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBillingHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner
        userId
        date
        nextRenewDate
        subscription
        amount
        paid
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        user {
          id
          lastname
          firstname
          avatarUri
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          email
          phoneNumber
          optIn
          birthDate
          subscription
        }
      }
      nextToken
      startedAt
    }
  }
`;
