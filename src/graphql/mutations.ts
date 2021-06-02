/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const createBudgetLine = /* GraphQL */ `
  mutation CreateBudgetLine(
    $input: CreateBudgetLineInput!
    $condition: ModelBudgetLineConditionInput
  ) {
    createBudgetLine(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const updateBudgetLine = /* GraphQL */ `
  mutation UpdateBudgetLine(
    $input: UpdateBudgetLineInput!
    $condition: ModelBudgetLineConditionInput
  ) {
    updateBudgetLine(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const deleteBudgetLine = /* GraphQL */ `
  mutation DeleteBudgetLine(
    $input: DeleteBudgetLineInput!
    $condition: ModelBudgetLineConditionInput
  ) {
    deleteBudgetLine(input: $input, condition: $condition) {
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const createBudgetLineDeadline = /* GraphQL */ `
  mutation CreateBudgetLineDeadline(
    $input: CreateBudgetLineDeadlineInput!
    $condition: ModelBudgetLineDeadlineConditionInput
  ) {
    createBudgetLineDeadline(input: $input, condition: $condition) {
      id
      realEstateId
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
        budgetLines {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const updateBudgetLineDeadline = /* GraphQL */ `
  mutation UpdateBudgetLineDeadline(
    $input: UpdateBudgetLineDeadlineInput!
    $condition: ModelBudgetLineDeadlineConditionInput
  ) {
    updateBudgetLineDeadline(input: $input, condition: $condition) {
      id
      realEstateId
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
        budgetLines {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const deleteBudgetLineDeadline = /* GraphQL */ `
  mutation DeleteBudgetLineDeadline(
    $input: DeleteBudgetLineDeadlineInput!
    $condition: ModelBudgetLineDeadlineConditionInput
  ) {
    deleteBudgetLineDeadline(input: $input, condition: $condition) {
      id
      realEstateId
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
        budgetLines {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const createRealEstateBankAccount = /* GraphQL */ `
  mutation CreateRealEstateBankAccount(
    $input: CreateRealEstateBankAccountInput!
    $condition: ModelRealEstateBankAccountConditionInput
  ) {
    createRealEstateBankAccount(input: $input, condition: $condition) {
      id
      realEstateId
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
        bridgeApiId
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const updateRealEstateBankAccount = /* GraphQL */ `
  mutation UpdateRealEstateBankAccount(
    $input: UpdateRealEstateBankAccountInput!
    $condition: ModelRealEstateBankAccountConditionInput
  ) {
    updateRealEstateBankAccount(input: $input, condition: $condition) {
      id
      realEstateId
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
        bridgeApiId
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const deleteRealEstateBankAccount = /* GraphQL */ `
  mutation DeleteRealEstateBankAccount(
    $input: DeleteRealEstateBankAccountInput!
    $condition: ModelRealEstateBankAccountConditionInput
  ) {
    deleteRealEstateBankAccount(input: $input, condition: $condition) {
      id
      realEstateId
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
        bridgeApiId
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
        bankMovements {
          nextToken
          startedAt
        }
        budgetLineDeadlines {
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
export const createBankAccount = /* GraphQL */ `
  mutation CreateBankAccount(
    $input: CreateBankAccountInput!
    $condition: ModelBankAccountConditionInput
  ) {
    createBankAccount(input: $input, condition: $condition) {
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
      bridgeApiId
      movements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateBankAccount = /* GraphQL */ `
  mutation UpdateBankAccount(
    $input: UpdateBankAccountInput!
    $condition: ModelBankAccountConditionInput
  ) {
    updateBankAccount(input: $input, condition: $condition) {
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
      bridgeApiId
      movements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteBankAccount = /* GraphQL */ `
  mutation DeleteBankAccount(
    $input: DeleteBankAccountInput!
    $condition: ModelBankAccountConditionInput
  ) {
    deleteBankAccount(input: $input, condition: $condition) {
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
      bridgeApiId
      movements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createBankMovement = /* GraphQL */ `
  mutation CreateBankMovement(
    $input: CreateBankMovementInput!
    $condition: ModelBankMovementConditionInput
  ) {
    createBankMovement(input: $input, condition: $condition) {
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
        bridgeApiId
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
        bridgeApiId
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
      bridgeApiId
      description
      amount
      budgetLineDeadlineId
      budgetLineDeadline {
        id
        realEstateId
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
export const updateBankMovement = /* GraphQL */ `
  mutation UpdateBankMovement(
    $input: UpdateBankMovementInput!
    $condition: ModelBankMovementConditionInput
  ) {
    updateBankMovement(input: $input, condition: $condition) {
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
        bridgeApiId
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
        bridgeApiId
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
      bridgeApiId
      description
      amount
      budgetLineDeadlineId
      budgetLineDeadline {
        id
        realEstateId
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
export const deleteBankMovement = /* GraphQL */ `
  mutation DeleteBankMovement(
    $input: DeleteBankMovementInput!
    $condition: ModelBankMovementConditionInput
  ) {
    deleteBankMovement(input: $input, condition: $condition) {
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
        bridgeApiId
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
        bridgeApiId
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
      bridgeApiId
      description
      amount
      budgetLineDeadlineId
      budgetLineDeadline {
        id
        realEstateId
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      lastname
      firstname
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
      expoToken
      bridgeApiUser
      avatarUri
      birthDate
      subscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      lastname
      firstname
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
      expoToken
      bridgeApiUser
      avatarUri
      birthDate
      subscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      lastname
      firstname
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
      expoToken
      bridgeApiUser
      avatarUri
      birthDate
      subscription
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createRealEstate = /* GraphQL */ `
  mutation CreateRealEstate(
    $input: CreateRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    createRealEstate(input: $input, condition: $condition) {
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
      bankMovements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
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
export const updateRealEstate = /* GraphQL */ `
  mutation UpdateRealEstate(
    $input: UpdateRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    updateRealEstate(input: $input, condition: $condition) {
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
      bankMovements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
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
export const deleteRealEstate = /* GraphQL */ `
  mutation DeleteRealEstate(
    $input: DeleteRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    deleteRealEstate(input: $input, condition: $condition) {
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
      bankMovements {
        items {
          id
          bankAccountId
          realEstateId
          bridgeApiId
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      owner
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      owner
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      owner
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const createBillingHistory = /* GraphQL */ `
  mutation CreateBillingHistory(
    $input: CreateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    createBillingHistory(input: $input, condition: $condition) {
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateBillingHistory = /* GraphQL */ `
  mutation UpdateBillingHistory(
    $input: UpdateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    updateBillingHistory(input: $input, condition: $condition) {
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteBillingHistory = /* GraphQL */ `
  mutation DeleteBillingHistory(
    $input: DeleteBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    deleteBillingHistory(input: $input, condition: $condition) {
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
        expoToken
        bridgeApiUser
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
