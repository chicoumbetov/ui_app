/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBankAccount = /* GraphQL */ `
  query GetBankAccount($id: ID!) {
    getBankAccount(id: $id) {
      id
      bank
      name
      iban
      bic
      balance
      biId
      biConnectionId
      biState
      accountOwner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      movements {
        items {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          status
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
            purchasePrice
            notaryFee
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
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            accountOwner
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          budgetLineDeadlines {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
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
            purchasePrice
            notaryFee
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
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            accountOwner
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
      status
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      bankAccount {
        id
        bank
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
          rentalCharges
          managementFees
          householdWaste
          rentalType
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
            purchasePrice
            notaryFee
            admins
            shared
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
            status
            date
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
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
            tenantId
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
      rentalCharges
      managementFees
      householdWaste
      frequency
      nextDueDate
      rentalType
      infoCredit {
        borrowedCapital
        loanStartDate
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
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
      rentalCharges
      managementFees
      householdWaste
      rentalType
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      bankMouvement {
        id
        bankAccountId
        realEstateId
        biId
        description
        amount
        status
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      budgetLine {
        id
        realEstateId
        type
        category
        amount
        rentalCharges
        managementFees
        householdWaste
        frequency
        nextDueDate
        rentalType
        infoCredit {
          borrowedCapital
          loanStartDate
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
      }
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
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      realEstate {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      bankAccount {
        id
        bank
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
      }
    }
  }
`;
export const documentsByKey = /* GraphQL */ `
  query DocumentsByKey(
    $key: String
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentsByKey(
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
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getBankMovementsByBankAccountId = /* GraphQL */ `
  query GetBankMovementsByBankAccountId(
    $bankAccountId: ID
    $statusDate: ModelBankMovementBankMovementsByBankAccountCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getBankMovementsByBankAccountId(
      bankAccountId: $bankAccountId
      statusDate: $statusDate
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
        status
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      nextToken
      startedAt
    }
  }
`;
export const listBankMovementsByBiId = /* GraphQL */ `
  query ListBankMovementsByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovementsByBiId(
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
        status
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
        notificationParams {
          echeanceFacture {
            push
            email
          }
          loyer {
            push
            email
          }
          debitBancaire {
            push
            email
          }
          creditBancaire {
            push
            email
          }
          soldeNegatif {
            push
            email
          }
          retardLoyer {
            push
            email
          }
          mauvaiseRenta {
            push
            email
          }
          autre {
            push
            email
          }
        }
        notificationLastSeenAt
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      detentionPart
      typeImpot
      purchasePrice
      notaryFee
      admins
      shared
      tenants {
        id
        amount
        lastname
        firstname
        rentalType
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
            purchasePrice
            notaryFee
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
      documents {
        items {
          id
          realEstateId
          name
          key
          s3file
          createdAt
          _version
          _deleted
          _lastChangedAt
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
            purchasePrice
            notaryFee
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
      bankMovements {
        items {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          status
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
            purchasePrice
            notaryFee
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
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            accountOwner
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          budgetLineDeadlines {
            nextToken
            startedAt
          }
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
          rentalCharges
          managementFees
          householdWaste
          frequency
          nextDueDate
          rentalType
          infoCredit {
            borrowedCapital
            loanStartDate
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
            purchasePrice
            notaryFee
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
          bankMouvementId
          budgetLineId
          type
          category
          amount
          rentalCharges
          managementFees
          householdWaste
          rentalType
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
            purchasePrice
            notaryFee
            admins
            shared
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
            status
            date
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
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
            tenantId
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
            purchasePrice
            notaryFee
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
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            accountOwner
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      nextToken
      startedAt
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
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
            createdAt
            _version
            _deleted
            _lastChangedAt
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
            status
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
        budgetLines {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            rentalType
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const pendingInvitationsByEmail = /* GraphQL */ `
  query PendingInvitationsByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelPendingInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pendingInvitationsByEmail(
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
        realEstate {
          id
          name
          iconUri
          purchaseYear
          type
          ownName
          company
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
      }
      nextToken
      startedAt
    }
  }
`;
export const listBankAccountsByBiId = /* GraphQL */ `
  query ListBankAccountsByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccountsByBiId(
      biId: $biId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bank
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
      }
      nextToken
      startedAt
    }
  }
`;
export const listBankAccountsByBiConnectionId = /* GraphQL */ `
  query ListBankAccountsByBiConnectionId(
    $biConnectionId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccountsByBiConnectionId(
      biConnectionId: $biConnectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bank
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        accountOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        movements {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
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
        status
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
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
            rentalCharges
            managementFees
            householdWaste
            rentalType
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
      }
      nextToken
      startedAt
    }
  }
`;
export const getBillingHistory = /* GraphQL */ `
  query GetBillingHistory($id: ID!, $nextRenewDate: AWSDate!) {
    getBillingHistory(id: $id, nextRenewDate: $nextRenewDate) {
      id
      userId
      createdAt
      nextRenewDate
      subscription
      amount
      paid
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
    $id: ID
    $nextRenewDate: ModelStringKeyConditionInput
    $filter: ModelBillingHistoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBillingHistorys(
      id: $id
      nextRenewDate: $nextRenewDate
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        createdAt
        nextRenewDate
        subscription
        amount
        paid
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
            notificationLastSeenAt
          }
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
export const listBillingHistoriesByUser = /* GraphQL */ `
  query ListBillingHistoriesByUser(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBillingHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBillingHistoriesByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        createdAt
        nextRenewDate
        subscription
        amount
        paid
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
            notificationLastSeenAt
          }
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
        createdAt
        nextRenewDate
        subscription
        amount
        paid
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
            notificationLastSeenAt
          }
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
        rentalCharges
        managementFees
        householdWaste
        frequency
        nextDueDate
        rentalType
        infoCredit {
          borrowedCapital
          loanStartDate
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        rentalCharges
        managementFees
        householdWaste
        rentalType
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankMouvement {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          status
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
            purchasePrice
            notaryFee
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
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            accountOwner
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          budgetLineDeadlines {
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
          rentalCharges
          managementFees
          householdWaste
          frequency
          nextDueDate
          rentalType
          infoCredit {
            borrowedCapital
            loanStartDate
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
            purchasePrice
            notaryFee
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
      nextToken
      startedAt
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!, $createdAt: AWSDateTime!) {
    getNotification(id: $id, createdAt: $createdAt) {
      id
      userId
      type
      title
      body
      data
      clicked
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          birthDate
          subscription
          notificationLastSeenAt
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
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNotifications(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        type
        title
        body
        data
        clicked
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
            notificationLastSeenAt
          }
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
export const listNotificationsByUser = /* GraphQL */ `
  query ListNotificationsByUser(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationsByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        title
        body
        data
        clicked
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
            notificationLastSeenAt
          }
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
export const getNotificationById = /* GraphQL */ `
  query GetNotificationById(
    $id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getNotificationById(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        title
        body
        data
        clicked
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
            notificationLastSeenAt
          }
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
        type
        title
        body
        data
        clicked
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
            notificationLastSeenAt
          }
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
export const getNotificationTickets = /* GraphQL */ `
  query GetNotificationTickets($id: ID!) {
    getNotificationTickets(id: $id) {
      id
      expoTokens {
        userId
        token
      }
      ticketIds
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listNotificationTicketss = /* GraphQL */ `
  query ListNotificationTicketss(
    $filter: ModelNotificationTicketsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationTicketss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        expoTokens {
          userId
          token
        }
        ticketIds
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
export const syncNotificationTickets = /* GraphQL */ `
  query SyncNotificationTickets(
    $filter: ModelNotificationTicketsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificationTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        expoTokens {
          userId
          token
        }
        ticketIds
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          purchasePrice
          notaryFee
          admins
          shared
          tenants {
            id
            amount
            lastname
            firstname
            rentalType
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
          bankMovements {
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
        }
        bankAccount {
          id
          bank
          name
          iban
          bic
          balance
          biId
          biConnectionId
          biState
          accountOwner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          movements {
            nextToken
            startedAt
          }
          realEstates {
            nextToken
            startedAt
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;
