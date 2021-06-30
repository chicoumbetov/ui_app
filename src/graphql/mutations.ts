/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateBankAccount = /* GraphQL */ `
  mutation UpdateBankAccount($input: UpdateBankAccountInput!) {
    updateBankAccount(input: $input) {
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
export const deleteBankAccount = /* GraphQL */ `
  mutation DeleteBankAccount($input: DeleteBankAccountInput!) {
    deleteBankAccount(input: $input) {
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
export const updateBankMovement = /* GraphQL */ `
  mutation UpdateBankMovement($input: UpdateBankMovementInput!) {
    updateBankMovement(input: $input) {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
export const deleteBankMovement = /* GraphQL */ `
  mutation DeleteBankMovement($input: DeleteBankMovementInput!) {
    deleteBankMovement(input: $input) {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
export const updateBudgetLine = /* GraphQL */ `
  mutation UpdateBudgetLine($input: UpdateBudgetLineInput!) {
    updateBudgetLine(input: $input) {
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
export const deleteBudgetLine = /* GraphQL */ `
  mutation DeleteBudgetLine($input: DeleteBudgetLineInput!) {
    deleteBudgetLine(input: $input) {
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
export const updateBudgetLineDeadline = /* GraphQL */ `
  mutation UpdateBudgetLineDeadline($input: UpdateBudgetLineDeadlineInput!) {
    updateBudgetLineDeadline(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
export const deleteBudgetLineDeadline = /* GraphQL */ `
  mutation DeleteBudgetLineDeadline($input: DeleteBudgetLineDeadlineInput!) {
    deleteBudgetLineDeadline(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument($input: UpdateDocumentInput!) {
    updateDocument(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument($input: DeleteDocumentInput!) {
    deleteDocument(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const updateRealEstateBankAccount = /* GraphQL */ `
  mutation UpdateRealEstateBankAccount(
    $input: UpdateRealEstateBankAccountInput!
  ) {
    updateRealEstateBankAccount(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const deleteRealEstateBankAccount = /* GraphQL */ `
  mutation DeleteRealEstateBankAccount(
    $input: DeleteRealEstateBankAccountInput!
  ) {
    deleteRealEstateBankAccount(input: $input) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      detentionPart
      typeImpot
      admins
      shared
      tenants {
        id
        amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      detentionPart
      typeImpot
      admins
      shared
      tenants {
        id
        amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      detentionPart
      typeImpot
      admins
      shared
      tenants {
        id
        amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
export const createPendingInvitation = /* GraphQL */ `
  mutation CreatePendingInvitation(
    $input: CreatePendingInvitationInput!
    $condition: ModelPendingInvitationConditionInput
  ) {
    createPendingInvitation(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const updatePendingInvitation = /* GraphQL */ `
  mutation UpdatePendingInvitation(
    $input: UpdatePendingInvitationInput!
    $condition: ModelPendingInvitationConditionInput
  ) {
    updatePendingInvitation(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const deletePendingInvitation = /* GraphQL */ `
  mutation DeletePendingInvitation(
    $input: DeletePendingInvitationInput!
    $condition: ModelPendingInvitationConditionInput
  ) {
    deletePendingInvitation(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
export const createBankAccount = /* GraphQL */ `
  mutation CreateBankAccount(
    $input: CreateBankAccountInput!
    $condition: ModelBankAccountConditionInput
  ) {
    createBankAccount(input: $input, condition: $condition) {
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
export const createBankMovement = /* GraphQL */ `
  mutation CreateBankMovement(
    $input: CreateBankMovementInput!
    $condition: ModelBankMovementConditionInput
  ) {
    createBankMovement(input: $input, condition: $condition) {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            ignored
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
export const createBillingHistory = /* GraphQL */ `
  mutation CreateBillingHistory(
    $input: CreateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    createBillingHistory(input: $input, condition: $condition) {
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
export const updateBillingHistory = /* GraphQL */ `
  mutation UpdateBillingHistory(
    $input: UpdateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    updateBillingHistory(input: $input, condition: $condition) {
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
export const deleteBillingHistory = /* GraphQL */ `
  mutation DeleteBillingHistory(
    $input: DeleteBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    deleteBillingHistory(input: $input, condition: $condition) {
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
      rentalCharges
      managementFees
      householdWaste
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
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        detentionPart
        typeImpot
        admins
        shared
        tenants {
          id
          amount
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
export const createBudgetLineDeadline = /* GraphQL */ `
  mutation CreateBudgetLineDeadline(
    $input: CreateBudgetLineDeadlineInput!
    $condition: ModelBudgetLineDeadlineConditionInput
  ) {
    createBudgetLineDeadline(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
          address {
            address
            additionalAddress
            postalCode
            city
            country
          }
          detentionPart
          typeImpot
          admins
          shared
          tenants {
            id
            amount
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createNotificationTickets = /* GraphQL */ `
  mutation CreateNotificationTickets(
    $input: CreateNotificationTicketsInput!
    $condition: ModelNotificationTicketsConditionInput
  ) {
    createNotificationTickets(input: $input, condition: $condition) {
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
export const updateNotificationTickets = /* GraphQL */ `
  mutation UpdateNotificationTickets(
    $input: UpdateNotificationTicketsInput!
    $condition: ModelNotificationTicketsConditionInput
  ) {
    updateNotificationTickets(input: $input, condition: $condition) {
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
export const deleteNotificationTickets = /* GraphQL */ `
  mutation DeleteNotificationTickets(
    $input: DeleteNotificationTicketsInput!
    $condition: ModelNotificationTicketsConditionInput
  ) {
    deleteNotificationTickets(input: $input, condition: $condition) {
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
export const createRealEstateBankAccount = /* GraphQL */ `
  mutation CreateRealEstateBankAccount(
    $input: CreateRealEstateBankAccountInput!
    $condition: ModelRealEstateBankAccountConditionInput
  ) {
    createRealEstateBankAccount(input: $input, condition: $condition) {
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
        admins
        shared
        tenants {
          id
          amount
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
