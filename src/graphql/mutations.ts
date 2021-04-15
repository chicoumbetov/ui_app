/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdresseType = /* GraphQL */ `
  mutation CreateAdresseType(
    $input: CreateAdresseTypeInput!
    $condition: ModelAdresseTypeConditionInput
  ) {
    createAdresseType(input: $input, condition: $condition) {
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
export const updateAdresseType = /* GraphQL */ `
  mutation UpdateAdresseType(
    $input: UpdateAdresseTypeInput!
    $condition: ModelAdresseTypeConditionInput
  ) {
    updateAdresseType(input: $input, condition: $condition) {
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
export const deleteAdresseType = /* GraphQL */ `
  mutation DeleteAdresseType(
    $input: DeleteAdresseTypeInput!
    $condition: ModelAdresseTypeConditionInput
  ) {
    deleteAdresseType(input: $input, condition: $condition) {
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createCompte = /* GraphQL */ `
  mutation CreateCompte(
    $input: CreateCompteInput!
    $condition: ModelCompteConditionInput
  ) {
    createCompte(input: $input, condition: $condition) {
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
export const updateCompte = /* GraphQL */ `
  mutation UpdateCompte(
    $input: UpdateCompteInput!
    $condition: ModelCompteConditionInput
  ) {
    updateCompte(input: $input, condition: $condition) {
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
export const deleteCompte = /* GraphQL */ `
  mutation DeleteCompte(
    $input: DeleteCompteInput!
    $condition: ModelCompteConditionInput
  ) {
    deleteCompte(input: $input, condition: $condition) {
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
