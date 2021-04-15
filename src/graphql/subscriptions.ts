/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdresseType = /* GraphQL */ `
  subscription OnCreateAdresseType {
    onCreateAdresseType {
      id
      adresse
      complementAdresse
      codePostal
      ville
      pays
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAdresseType = /* GraphQL */ `
  subscription OnUpdateAdresseType {
    onUpdateAdresseType {
      id
      adresse
      complementAdresse
      codePostal
      ville
      pays
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAdresseType = /* GraphQL */ `
  subscription OnDeleteAdresseType {
    onDeleteAdresseType {
      id
      adresse
      complementAdresse
      codePostal
      ville
      pays
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
      id
      userID
      nom
      prenom
      email
      motDePasse
      numeroTel
      optIn
      avatarUri
      dateNaissance
      abonnement
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
      id
      userID
      nom
      prenom
      email
      motDePasse
      numeroTel
      optIn
      avatarUri
      dateNaissance
      abonnement
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
      id
      userID
      nom
      prenom
      email
      motDePasse
      numeroTel
      optIn
      avatarUri
      dateNaissance
      abonnement
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCompte = /* GraphQL */ `
  subscription OnCreateCompte {
    onCreateCompte {
      id
      IBAN
      bank
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompte = /* GraphQL */ `
  subscription OnUpdateCompte {
    onUpdateCompte {
      id
      IBAN
      bank
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompte = /* GraphQL */ `
  subscription OnDeleteCompte {
    onDeleteCompte {
      id
      IBAN
      bank
      clientID
      client {
        id
        userID
        nom
        prenom
        email
        motDePasse
        numeroTel
        optIn
        avatarUri
        dateNaissance
        abonnement
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
