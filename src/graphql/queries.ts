/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUtilisateurs = /* GraphQL */ `
  query SyncUtilisateurs(
    $filter: ModelUtilisateurFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUtilisateurs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        nom
        prenom
        email
        numeroTel
        optIn
        adresse {
          adresse
          complementAdresse
          codePostal
          ville
          pays
        }
        avatarUri
        dateNaissance
        abonnement
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
export const getUtilisateur = /* GraphQL */ `
  query GetUtilisateur($id: ID!) {
    getUtilisateur(id: $id) {
      id
      userID
      nom
      prenom
      email
      numeroTel
      optIn
      adresse {
        adresse
        complementAdresse
        codePostal
        ville
        pays
      }
      avatarUri
      dateNaissance
      abonnement
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUtilisateurs = /* GraphQL */ `
  query ListUtilisateurs(
    $filter: ModelUtilisateurFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUtilisateurs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        nom
        prenom
        email
        numeroTel
        optIn
        adresse {
          adresse
          complementAdresse
          codePostal
          ville
          pays
        }
        avatarUri
        dateNaissance
        abonnement
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
