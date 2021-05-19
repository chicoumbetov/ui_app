/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRealEstate = /* GraphQL */ `
  subscription OnCreateRealEstate($admins: String!, $shared: String!) {
    onCreateRealEstate(admins: $admins, shared: $shared) {
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
export const onUpdateRealEstate = /* GraphQL */ `
  subscription OnUpdateRealEstate($admins: String!, $shared: String!) {
    onUpdateRealEstate(admins: $admins, shared: $shared) {
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
export const onDeleteRealEstate = /* GraphQL */ `
  subscription OnDeleteRealEstate($admins: String!, $shared: String!) {
    onDeleteRealEstate(admins: $admins, shared: $shared) {
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
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument {
    onCreateDocument {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument {
    onUpdateDocument {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument {
    onDeleteDocument {
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
export const onCreateBudgetLine = /* GraphQL */ `
  subscription OnCreateBudgetLine {
    onCreateBudgetLine {
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
export const onUpdateBudgetLine = /* GraphQL */ `
  subscription OnUpdateBudgetLine {
    onUpdateBudgetLine {
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
export const onDeleteBudgetLine = /* GraphQL */ `
  subscription OnDeleteBudgetLine {
    onDeleteBudgetLine {
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
export const onCreateRealEstateBankAccount = /* GraphQL */ `
  subscription OnCreateRealEstateBankAccount {
    onCreateRealEstateBankAccount {
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
export const onUpdateRealEstateBankAccount = /* GraphQL */ `
  subscription OnUpdateRealEstateBankAccount {
    onUpdateRealEstateBankAccount {
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
export const onDeleteRealEstateBankAccount = /* GraphQL */ `
  subscription OnDeleteRealEstateBankAccount {
    onDeleteRealEstateBankAccount {
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
export const onCreateBankAccount = /* GraphQL */ `
  subscription OnCreateBankAccount {
    onCreateBankAccount {
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
export const onUpdateBankAccount = /* GraphQL */ `
  subscription OnUpdateBankAccount {
    onUpdateBankAccount {
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
export const onDeleteBankAccount = /* GraphQL */ `
  subscription OnDeleteBankAccount {
    onDeleteBankAccount {
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
export const onCreateBankMovement = /* GraphQL */ `
  subscription OnCreateBankMovement {
    onCreateBankMovement {
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
export const onUpdateBankMovement = /* GraphQL */ `
  subscription OnUpdateBankMovement {
    onUpdateBankMovement {
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
export const onDeleteBankMovement = /* GraphQL */ `
  subscription OnDeleteBankMovement {
    onDeleteBankMovement {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String!) {
    onCreateNotification(owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($owner: String!) {
    onUpdateNotification(owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($owner: String!) {
    onDeleteNotification(owner: $owner) {
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
export const onCreateBillingHistory = /* GraphQL */ `
  subscription OnCreateBillingHistory($owner: String!) {
    onCreateBillingHistory(owner: $owner) {
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
export const onUpdateBillingHistory = /* GraphQL */ `
  subscription OnUpdateBillingHistory($owner: String!) {
    onUpdateBillingHistory(owner: $owner) {
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
export const onDeleteBillingHistory = /* GraphQL */ `
  subscription OnDeleteBillingHistory($owner: String!) {
    onDeleteBillingHistory(owner: $owner) {
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
