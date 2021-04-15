/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAdresseTypeInput = {
  id?: string | null,
  adresse: string,
  complementAdresse?: string | null,
  codePostal: number,
  ville: string,
  pays: string,
  clientID: string,
};

export type ModelAdresseTypeConditionInput = {
  adresse?: ModelStringInput | null,
  complementAdresse?: ModelStringInput | null,
  codePostal?: ModelIntInput | null,
  ville?: ModelStringInput | null,
  pays?: ModelStringInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelAdresseTypeConditionInput | null > | null,
  or?: Array< ModelAdresseTypeConditionInput | null > | null,
  not?: ModelAdresseTypeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type AdresseType = {
  __typename: "AdresseType",
  id?: string,
  adresse?: string,
  complementAdresse?: string | null,
  codePostal?: number,
  ville?: string,
  pays?: string,
  clientID?: string,
  client?: Client,
  createdAt?: string,
  updatedAt?: string,
};

export type Client = {
  __typename: "Client",
  id?: string,
  userID?: string | null,
  nom?: string,
  prenom?: string,
  email?: string,
  motDePasse?: string,
  numeroTel?: string,
  optIn?: boolean | null,
  avatarUri?: string | null,
  dateNaissance?: string | null,
  abonnement?: Abonnement | null,
  createdAt?: string,
  updatedAt?: string,
};

export enum Abonnement {
  UnADeuxBiens = "UnADeuxBiens",
  TroisACinqbiens = "TroisACinqbiens",
  PlusDeCinqBiens = "PlusDeCinqBiens",
}


export type UpdateAdresseTypeInput = {
  id: string,
  adresse?: string | null,
  complementAdresse?: string | null,
  codePostal?: number | null,
  ville?: string | null,
  pays?: string | null,
  clientID?: string | null,
};

export type DeleteAdresseTypeInput = {
  id?: string | null,
};

export type CreateClientInput = {
  id?: string | null,
  userID?: string | null,
  nom: string,
  prenom: string,
  email: string,
  motDePasse: string,
  numeroTel: string,
  optIn?: boolean | null,
  avatarUri?: string | null,
  dateNaissance?: string | null,
  abonnement?: Abonnement | null,
};

export type ModelClientConditionInput = {
  userID?: ModelIDInput | null,
  nom?: ModelStringInput | null,
  prenom?: ModelStringInput | null,
  email?: ModelStringInput | null,
  motDePasse?: ModelStringInput | null,
  numeroTel?: ModelStringInput | null,
  optIn?: ModelBooleanInput | null,
  avatarUri?: ModelStringInput | null,
  dateNaissance?: ModelStringInput | null,
  abonnement?: ModelAbonnementInput | null,
  and?: Array< ModelClientConditionInput | null > | null,
  or?: Array< ModelClientConditionInput | null > | null,
  not?: ModelClientConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelAbonnementInput = {
  eq?: Abonnement | null,
  ne?: Abonnement | null,
};

export type UpdateClientInput = {
  id: string,
  userID?: string | null,
  nom?: string | null,
  prenom?: string | null,
  email?: string | null,
  motDePasse?: string | null,
  numeroTel?: string | null,
  optIn?: boolean | null,
  avatarUri?: string | null,
  dateNaissance?: string | null,
  abonnement?: Abonnement | null,
};

export type DeleteClientInput = {
  id?: string | null,
};

export type CreateCompteInput = {
  id?: string | null,
  IBAN: string,
  bank: string,
  clientID: string,
};

export type ModelCompteConditionInput = {
  IBAN?: ModelStringInput | null,
  bank?: ModelStringInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelCompteConditionInput | null > | null,
  or?: Array< ModelCompteConditionInput | null > | null,
  not?: ModelCompteConditionInput | null,
};

export type Compte = {
  __typename: "Compte",
  id?: string,
  IBAN?: string,
  bank?: string,
  clientID?: string,
  client?: Client,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateCompteInput = {
  id: string,
  IBAN?: string | null,
  bank?: string | null,
  clientID?: string | null,
};

export type DeleteCompteInput = {
  id?: string | null,
};

export type ModelAdresseTypeFilterInput = {
  id?: ModelIDInput | null,
  adresse?: ModelStringInput | null,
  complementAdresse?: ModelStringInput | null,
  codePostal?: ModelIntInput | null,
  ville?: ModelStringInput | null,
  pays?: ModelStringInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelAdresseTypeFilterInput | null > | null,
  or?: Array< ModelAdresseTypeFilterInput | null > | null,
  not?: ModelAdresseTypeFilterInput | null,
};

export type ModelAdresseTypeConnection = {
  __typename: "ModelAdresseTypeConnection",
  items?:  Array<AdresseType | null > | null,
  nextToken?: string | null,
};

export type ModelClientFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  nom?: ModelStringInput | null,
  prenom?: ModelStringInput | null,
  email?: ModelStringInput | null,
  motDePasse?: ModelStringInput | null,
  numeroTel?: ModelStringInput | null,
  optIn?: ModelBooleanInput | null,
  avatarUri?: ModelStringInput | null,
  dateNaissance?: ModelStringInput | null,
  abonnement?: ModelAbonnementInput | null,
  and?: Array< ModelClientFilterInput | null > | null,
  or?: Array< ModelClientFilterInput | null > | null,
  not?: ModelClientFilterInput | null,
};

export type ModelClientConnection = {
  __typename: "ModelClientConnection",
  items?:  Array<Client | null > | null,
  nextToken?: string | null,
};

export type ModelCompteFilterInput = {
  id?: ModelIDInput | null,
  IBAN?: ModelStringInput | null,
  bank?: ModelStringInput | null,
  clientID?: ModelIDInput | null,
  and?: Array< ModelCompteFilterInput | null > | null,
  or?: Array< ModelCompteFilterInput | null > | null,
  not?: ModelCompteFilterInput | null,
};

export type ModelCompteConnection = {
  __typename: "ModelCompteConnection",
  items?:  Array<Compte | null > | null,
  nextToken?: string | null,
};

export type CreateAdresseTypeMutationVariables = {
  input?: CreateAdresseTypeInput,
  condition?: ModelAdresseTypeConditionInput | null,
};

export type CreateAdresseTypeMutation = {
  createAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdresseTypeMutationVariables = {
  input?: UpdateAdresseTypeInput,
  condition?: ModelAdresseTypeConditionInput | null,
};

export type UpdateAdresseTypeMutation = {
  updateAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdresseTypeMutationVariables = {
  input?: DeleteAdresseTypeInput,
  condition?: ModelAdresseTypeConditionInput | null,
};

export type DeleteAdresseTypeMutation = {
  deleteAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClientMutationVariables = {
  input?: CreateClientInput,
  condition?: ModelClientConditionInput | null,
};

export type CreateClientMutation = {
  createClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClientMutationVariables = {
  input?: UpdateClientInput,
  condition?: ModelClientConditionInput | null,
};

export type UpdateClientMutation = {
  updateClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClientMutationVariables = {
  input?: DeleteClientInput,
  condition?: ModelClientConditionInput | null,
};

export type DeleteClientMutation = {
  deleteClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCompteMutationVariables = {
  input?: CreateCompteInput,
  condition?: ModelCompteConditionInput | null,
};

export type CreateCompteMutation = {
  createCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompteMutationVariables = {
  input?: UpdateCompteInput,
  condition?: ModelCompteConditionInput | null,
};

export type UpdateCompteMutation = {
  updateCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompteMutationVariables = {
  input?: DeleteCompteInput,
  condition?: ModelCompteConditionInput | null,
};

export type DeleteCompteMutation = {
  deleteCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdresseTypeQueryVariables = {
  id?: string,
};

export type GetAdresseTypeQuery = {
  getAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdresseTypesQueryVariables = {
  filter?: ModelAdresseTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdresseTypesQuery = {
  listAdresseTypes?:  {
    __typename: "ModelAdresseTypeConnection",
    items?:  Array< {
      __typename: "AdresseType",
      id: string,
      adresse: string,
      complementAdresse?: string | null,
      codePostal: number,
      ville: string,
      pays: string,
      clientID: string,
      client?:  {
        __typename: "Client",
        id: string,
        userID?: string | null,
        nom: string,
        prenom: string,
        email: string,
        motDePasse: string,
        numeroTel: string,
        optIn?: boolean | null,
        avatarUri?: string | null,
        dateNaissance?: string | null,
        abonnement?: Abonnement | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClientQueryVariables = {
  id?: string,
};

export type GetClientQuery = {
  getClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClientsQueryVariables = {
  filter?: ModelClientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClientsQuery = {
  listClients?:  {
    __typename: "ModelClientConnection",
    items?:  Array< {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCompteQueryVariables = {
  id?: string,
};

export type GetCompteQuery = {
  getCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListComptesQueryVariables = {
  filter?: ModelCompteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListComptesQuery = {
  listComptes?:  {
    __typename: "ModelCompteConnection",
    items?:  Array< {
      __typename: "Compte",
      id: string,
      IBAN: string,
      bank: string,
      clientID: string,
      client?:  {
        __typename: "Client",
        id: string,
        userID?: string | null,
        nom: string,
        prenom: string,
        email: string,
        motDePasse: string,
        numeroTel: string,
        optIn?: boolean | null,
        avatarUri?: string | null,
        dateNaissance?: string | null,
        abonnement?: Abonnement | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAdresseTypeSubscription = {
  onCreateAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdresseTypeSubscription = {
  onUpdateAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdresseTypeSubscription = {
  onDeleteAdresseType?:  {
    __typename: "AdresseType",
    id: string,
    adresse: string,
    complementAdresse?: string | null,
    codePostal: number,
    ville: string,
    pays: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClientSubscription = {
  onCreateClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClientSubscription = {
  onUpdateClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClientSubscription = {
  onDeleteClient?:  {
    __typename: "Client",
    id: string,
    userID?: string | null,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    optIn?: boolean | null,
    avatarUri?: string | null,
    dateNaissance?: string | null,
    abonnement?: Abonnement | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCompteSubscription = {
  onCreateCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompteSubscription = {
  onUpdateCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompteSubscription = {
  onDeleteCompte?:  {
    __typename: "Compte",
    id: string,
    IBAN: string,
    bank: string,
    clientID: string,
    client?:  {
      __typename: "Client",
      id: string,
      userID?: string | null,
      nom: string,
      prenom: string,
      email: string,
      motDePasse: string,
      numeroTel: string,
      optIn?: boolean | null,
      avatarUri?: string | null,
      dateNaissance?: string | null,
      abonnement?: Abonnement | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
