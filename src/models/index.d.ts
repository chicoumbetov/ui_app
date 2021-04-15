import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Abonnement {
  UN_A_DEUX_BIENS = "UnADeuxBiens",
  TROIS_A_CINQBIENS = "TroisACinqbiens",
  PLUS_DE_CINQ_BIENS = "PlusDeCinqBiens"
}



export declare class AdresseType {
  readonly id: string;
  readonly adresse: string;
  readonly complementAdresse?: string;
  readonly codePostal: number;
  readonly ville: string;
  readonly pays: string;
  readonly clientID: string;
  readonly client?: Client;
  constructor(init: ModelInit<AdresseType>);
  static copyOf(source: AdresseType, mutator: (draft: MutableModel<AdresseType>) => MutableModel<AdresseType> | void): AdresseType;
}

export declare class Client {
  readonly id: string;
  readonly userID?: string;
  readonly nom: string;
  readonly prenom: string;
  readonly email: string;
  readonly motDePasse: string;
  readonly numeroTel: string;
  readonly optIn?: boolean;
  readonly avatarUri?: string;
  readonly dateNaissance?: string;
  readonly abonnement?: Abonnement | keyof typeof Abonnement;
  constructor(init: ModelInit<Client>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}

export declare class Compte {
  readonly id: string;
  readonly IBAN: string;
  readonly bank: string;
  readonly clientID: string;
  readonly client?: Client;
  constructor(init: ModelInit<Compte>);
  static copyOf(source: Compte, mutator: (draft: MutableModel<Compte>) => MutableModel<Compte> | void): Compte;
}