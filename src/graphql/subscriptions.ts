/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      budgetLines {
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
      budgetLines {
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
      budgetLines {
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
  }
`;
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
  }
`;
export const onCreateBudgetLineDeadline = /* GraphQL */ `
  subscription OnCreateBudgetLineDeadline {
    onCreateBudgetLineDeadline {
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
  }
`;
export const onUpdateBudgetLineDeadline = /* GraphQL */ `
  subscription OnUpdateBudgetLineDeadline {
    onUpdateBudgetLineDeadline {
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
  }
`;
export const onDeleteBudgetLineDeadline = /* GraphQL */ `
  subscription OnDeleteBudgetLineDeadline {
    onDeleteBudgetLineDeadline {
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
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($userId: String) {
    onCreateNotification(userId: $userId) {
      id
      userId
      type
      title
      body
      data
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($userId: String) {
    onUpdateNotification(userId: $userId) {
      id
      userId
      type
      title
      body
      data
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($userId: String) {
    onDeleteNotification(userId: $userId) {
      id
      userId
      type
      title
      body
      data
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onCreateBillingHistory = /* GraphQL */ `
  subscription OnCreateBillingHistory($userId: String) {
    onCreateBillingHistory(userId: $userId) {
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onUpdateBillingHistory = /* GraphQL */ `
  subscription OnUpdateBillingHistory($userId: String) {
    onUpdateBillingHistory(userId: $userId) {
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onDeleteBillingHistory = /* GraphQL */ `
  subscription OnDeleteBillingHistory($userId: String) {
    onDeleteBillingHistory(userId: $userId) {
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
        }
        expoToken
        biUser
        biToken
      }
    }
  }
`;
export const onCreateNotificationTickets = /* GraphQL */ `
  subscription OnCreateNotificationTickets {
    onCreateNotificationTickets {
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
export const onUpdateNotificationTickets = /* GraphQL */ `
  subscription OnUpdateNotificationTickets {
    onUpdateNotificationTickets {
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
export const onDeleteNotificationTickets = /* GraphQL */ `
  subscription OnDeleteNotificationTickets {
    onDeleteNotificationTickets {
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
