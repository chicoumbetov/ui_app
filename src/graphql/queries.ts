/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const userByBiUser = /* GraphQL */ `
  query UserByBiUser(
    $biUser: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByBiUser(
      biUser: $biUser
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
      }
      nextToken
      startedAt
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
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
      privateProfile {
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
      expoToken
      biUser
      biToken
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
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
        admins
        shared
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
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
      admins
      shared
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      pendingInvitations {
        items {
          id
          realEstateId
          email
          type
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
          key
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
          bankMouvementId
          budgetLineId
          type
          category
          amount
          frequency
          date
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
      bankMovements {
        items {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          budgetLineDeadlineId
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
        admins
        shared
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getPendingInvitation = /* GraphQL */ `
  query GetPendingInvitation($id: ID!) {
    getPendingInvitation(id: $id) {
      id
      realEstateId
      email
      type
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listPendingInvitations = /* GraphQL */ `
  query ListPendingInvitations(
    $filter: ModelPendingInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPendingInvitations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        email
        type
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
export const pendingInvitationByEmail = /* GraphQL */ `
  query PendingInvitationByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelPendingInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pendingInvitationByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        email
        type
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
export const syncPendingInvitations = /* GraphQL */ `
  query SyncPendingInvitations(
    $filter: ModelPendingInvitationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPendingInvitations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstateId
        email
        type
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
      key
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
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
        key
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
export const documentByKey = /* GraphQL */ `
  query DocumentByKey(
    $key: String
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentByKey(
      key: $key
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        name
        key
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
        key
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
        admins
        shared
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
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
export const getBudgetLineDeadline = /* GraphQL */ `
  query GetBudgetLineDeadline($id: ID!) {
    getBudgetLineDeadline(id: $id) {
      id
      realEstateId
      bankMouvementId
      budgetLineId
      type
      category
      amount
      frequency
      date
      infoCredit {
        amount
        interest
        assurance
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      bankMouvement {
        id
        bankAccountId
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        budgetLineDeadline {
          nextToken
          startedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listBudgetLineDeadlines = /* GraphQL */ `
  query ListBudgetLineDeadlines(
    $filter: ModelBudgetLineDeadlineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBudgetLineDeadlines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        bankMouvementId
        budgetLineId
        type
        category
        amount
        frequency
        date
        infoCredit {
          amount
          interest
          assurance
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
        bankMouvement {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          budgetLineDeadlineId
          ignored
          date
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
export const syncBudgetLineDeadlines = /* GraphQL */ `
  query SyncBudgetLineDeadlines(
    $filter: ModelBudgetLineDeadlineFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBudgetLineDeadlines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        realEstateId
        bankMouvementId
        budgetLineId
        type
        category
        amount
        frequency
        date
        infoCredit {
          amount
          interest
          assurance
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
        bankMouvement {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          budgetLineDeadlineId
          ignored
          date
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
export const getRealEstateBankAccount = /* GraphQL */ `
  query GetRealEstateBankAccount($id: ID!) {
    getRealEstateBankAccount(id: $id) {
      id
      realEstateId
      bankAccountId
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
      bankAccount {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listRealEstateBankAccounts = /* GraphQL */ `
  query ListRealEstateBankAccounts(
    $filter: ModelRealEstateBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstateBankAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        bankAccountId
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
export const listRealEstatesByBankAccount = /* GraphQL */ `
  query ListRealEstatesByBankAccount(
    $bankAccountId: ID
    $realEstateId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRealEstateBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstatesByBankAccount(
      bankAccountId: $bankAccountId
      realEstateId: $realEstateId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        realEstateId
        bankAccountId
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
export const listBankAccounts = /* GraphQL */ `
  query ListBankAccounts(
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
        }
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
      bank
      accountOwner
      name
      iban
      bic
      balance
      biId
      biConnectionId
      biState
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      movements {
        items {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          budgetLineDeadlineId
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
  }
`;
export const listBankAccountByBiId = /* GraphQL */ `
  query ListBankAccountByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccountByBiId(
      biId: $biId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listBankAccountByBiConnectionId = /* GraphQL */ `
  query ListBankAccountByBiConnectionId(
    $biConnectionId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccountByBiConnectionId(
      biConnectionId: $biConnectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
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
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
        }
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
      realEstateId
      biId
      description
      amount
      budgetLineDeadlineId
      ignored
      date
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
        budgetLines {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
          nextToken
          startedAt
        }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
      budgetLineDeadline {
        items {
          id
          realEstateId
          bankMouvementId
          budgetLineId
          type
          category
          amount
          frequency
          date
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
      bankAccount {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        realEstates {
          nextToken
          startedAt
        }
        movements {
          nextToken
          startedAt
        }
      }
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
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        budgetLineDeadline {
          nextToken
          startedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
export const getBankMovementByBankAccountId = /* GraphQL */ `
  query GetBankMovementByBankAccountId(
    $bankAccountId: ID
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getBankMovementByBankAccountId(
      bankAccountId: $bankAccountId
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bankAccountId
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        budgetLineDeadline {
          nextToken
          startedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
export const listBankMovementByBiId = /* GraphQL */ `
  query ListBankMovementByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovementByBiId(
      biId: $biId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bankAccountId
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        budgetLineDeadline {
          nextToken
          startedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        budgetLineDeadline {
          nextToken
          startedAt
        }
        bankAccount {
          id
          bank
          accountOwner
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
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
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      userId
      category
      text
      params
      createdAt
      _version
      _deleted
      _lastChangedAt
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
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
        userId
        category
        text
        params
        createdAt
        _version
        _deleted
        _lastChangedAt
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
          expoToken
          biUser
          biToken
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
        userId
        category
        text
        params
        createdAt
        _version
        _deleted
        _lastChangedAt
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
          expoToken
          biUser
          biToken
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
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
          expoToken
          biUser
          biToken
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
          expoToken
          biUser
          biToken
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotificationReceipts = /* GraphQL */ `
  query GetNotificationReceipts($id: ID!) {
    getNotificationReceipts(id: $id) {
      id
      userId
      expoToken
      receiptId
      createdAt
      _version
      _deleted
      _lastChangedAt
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
        privateProfile {
          phoneNumber
          optIn
          birthDate
          subscription
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const listNotificationReceiptss = /* GraphQL */ `
  query ListNotificationReceiptss(
    $filter: ModelNotificationReceiptsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationReceiptss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        expoToken
        receiptId
        createdAt
        _version
        _deleted
        _lastChangedAt
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
          expoToken
          biUser
          biToken
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotificationReceipts = /* GraphQL */ `
  query SyncNotificationReceipts(
    $filter: ModelNotificationReceiptsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificationReceipts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        expoToken
        receiptId
        createdAt
        _version
        _deleted
        _lastChangedAt
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
          expoToken
          biUser
          biToken
        }
      }
      nextToken
      startedAt
    }
  }
`;
