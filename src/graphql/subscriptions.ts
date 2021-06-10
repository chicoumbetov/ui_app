/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument {
    onCreateDocument {
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
        documents {
          nextToken
          startedAt
        }
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument {
    onUpdateDocument {
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
        documents {
          nextToken
          startedAt
        }
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument {
    onDeleteDocument {
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
        documents {
          nextToken
          startedAt
        }
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRealEstate = /* GraphQL */ `
  subscription OnCreateRealEstate($admins: String, $shared: String) {
    onCreateRealEstate(admins: $admins, shared: $shared) {
      id
      name
      iconUri
      purchaseYear
      type
      ownName
      company
      detentionPart
      typeImpot
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
export const onUpdateRealEstate = /* GraphQL */ `
  subscription OnUpdateRealEstate($admins: String, $shared: String) {
    onUpdateRealEstate(admins: $admins, shared: $shared) {
      id
      name
      iconUri
      purchaseYear
      type
      ownName
      company
      detentionPart
      typeImpot
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
export const onDeleteRealEstate = /* GraphQL */ `
  subscription OnDeleteRealEstate($admins: String, $shared: String) {
    onDeleteRealEstate(admins: $admins, shared: $shared) {
      id
      name
      iconUri
      purchaseYear
      type
      ownName
      company
      detentionPart
      typeImpot
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
export const onCreatePendingInvitation = /* GraphQL */ `
  subscription OnCreatePendingInvitation {
    onCreatePendingInvitation {
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
        documents {
          nextToken
          startedAt
        }
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
export const onUpdatePendingInvitation = /* GraphQL */ `
  subscription OnUpdatePendingInvitation {
    onUpdatePendingInvitation {
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
        documents {
          nextToken
          startedAt
        }
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
export const onDeletePendingInvitation = /* GraphQL */ `
  subscription OnDeletePendingInvitation {
    onDeletePendingInvitation {
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
        documents {
          nextToken
          startedAt
        }
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
export const onCreateBudgetLine = /* GraphQL */ `
  subscription OnCreateBudgetLine {
    onCreateBudgetLine {
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
        documents {
          nextToken
          startedAt
        }
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
export const onUpdateBudgetLine = /* GraphQL */ `
  subscription OnUpdateBudgetLine {
    onUpdateBudgetLine {
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
        documents {
          nextToken
          startedAt
        }
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
export const onDeleteBudgetLine = /* GraphQL */ `
  subscription OnDeleteBudgetLine {
    onDeleteBudgetLine {
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
        documents {
          nextToken
          startedAt
        }
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
export const onCreateBudgetLineDeadline = /* GraphQL */ `
  subscription OnCreateBudgetLineDeadline {
    onCreateBudgetLineDeadline {
      id
      realEstateId
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
        documents {
          nextToken
          startedAt
        }
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
    }
  }
`;
export const onUpdateBudgetLineDeadline = /* GraphQL */ `
  subscription OnUpdateBudgetLineDeadline {
    onUpdateBudgetLineDeadline {
      id
      realEstateId
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
        documents {
          nextToken
          startedAt
        }
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
    }
  }
`;
export const onDeleteBudgetLineDeadline = /* GraphQL */ `
  subscription OnDeleteBudgetLineDeadline {
    onDeleteBudgetLineDeadline {
      id
      realEstateId
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
        documents {
          nextToken
          startedAt
        }
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
    }
  }
`;
export const onCreateRealEstateBankAccount = /* GraphQL */ `
  subscription OnCreateRealEstateBankAccount {
    onCreateRealEstateBankAccount {
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
        documents {
          nextToken
          startedAt
        }
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
export const onUpdateRealEstateBankAccount = /* GraphQL */ `
  subscription OnUpdateRealEstateBankAccount {
    onUpdateRealEstateBankAccount {
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
        documents {
          nextToken
          startedAt
        }
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
export const onDeleteRealEstateBankAccount = /* GraphQL */ `
  subscription OnDeleteRealEstateBankAccount {
    onDeleteRealEstateBankAccount {
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
        documents {
          nextToken
          startedAt
        }
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
export const onCreateBankAccount = /* GraphQL */ `
  subscription OnCreateBankAccount {
    onCreateBankAccount {
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
export const onUpdateBankAccount = /* GraphQL */ `
  subscription OnUpdateBankAccount {
    onUpdateBankAccount {
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
export const onDeleteBankAccount = /* GraphQL */ `
  subscription OnDeleteBankAccount {
    onDeleteBankAccount {
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
export const onCreateBankMovement = /* GraphQL */ `
  subscription OnCreateBankMovement {
    onCreateBankMovement {
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
        documents {
          nextToken
          startedAt
        }
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
        id
        realEstateId
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
export const onUpdateBankMovement = /* GraphQL */ `
  subscription OnUpdateBankMovement {
    onUpdateBankMovement {
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
        documents {
          nextToken
          startedAt
        }
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
        id
        realEstateId
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
export const onDeleteBankMovement = /* GraphQL */ `
  subscription OnDeleteBankMovement {
    onDeleteBankMovement {
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
        documents {
          nextToken
          startedAt
        }
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
        id
        realEstateId
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String) {
    onCreateNotification(owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($owner: String) {
    onUpdateNotification(owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($owner: String) {
    onDeleteNotification(owner: $owner) {
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
export const onCreateBillingHistory = /* GraphQL */ `
  subscription OnCreateBillingHistory($owner: String) {
    onCreateBillingHistory(owner: $owner) {
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
export const onUpdateBillingHistory = /* GraphQL */ `
  subscription OnUpdateBillingHistory($owner: String) {
    onUpdateBillingHistory(owner: $owner) {
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
export const onDeleteBillingHistory = /* GraphQL */ `
  subscription OnDeleteBillingHistory($owner: String) {
    onDeleteBillingHistory(owner: $owner) {
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
