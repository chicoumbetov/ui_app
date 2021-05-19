/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      owner
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
      owner
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
      owner
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
      budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
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
      budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
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
      budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
      id
      realEstateId
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      name
      s3file
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      name
      s3file
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      name
      s3file
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          admins
          shared
          pendingInvitations
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
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
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
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          admins
          shared
          pendingInvitations
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
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
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
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          detentionPart
          admins
          shared
          pendingInvitations
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
        nextDueDate
        infoCredit {
          borrowedCapital
          loadStartDate
          duration
          interestRate
          assuranceRate
        }
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      category
      text
      params
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      category
      text
      params
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      category
      text
      params
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      user {
        id
        owner
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
        avatarUri
        birthDate
        subscription
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
    }
  }
`;
