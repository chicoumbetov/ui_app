/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAdresseType = /* GraphQL */ `
  query GetAdresseType($id: ID!) {
    getAdresseType(id: $id) {
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
export const listAdresseTypes = /* GraphQL */ `
  query ListAdresseTypes(
    $filter: ModelAdresseTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdresseTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
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
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCompte = /* GraphQL */ `
  query GetCompte($id: ID!) {
    getCompte(id: $id) {
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
export const listComptes = /* GraphQL */ `
  query ListComptes(
    $filter: ModelCompteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComptes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
