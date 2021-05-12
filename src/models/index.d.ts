import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Abonnement {
  UN_A_DEUX_BIENS = "UnADeuxBiens",
  TROIS_A_CINQBIENS = "TroisACinqbiens",
  PLUS_DE_CINQ_BIENS = "PlusDeCinqBiens"
}

export declare class Adresse {
  readonly adresse: string;
  readonly complementAdresse?: string;
  readonly codePostal: string;
  readonly ville: string;
  readonly pays: string;
  constructor(init: ModelInit<Adresse>);
}

export declare class Utilisateur {
  readonly id: string;
  readonly userID?: string;
  readonly nom?: string;
  readonly prenom?: string;
  readonly email?: string;
  readonly numeroTel?: string;
  readonly optIn?: boolean;
  readonly adresse?: Adresse;
  readonly avatarUri?: string;
  readonly dateNaissance?: string;
  readonly abonnement?: Abonnement | keyof typeof Abonnement;
  constructor(init: ModelInit<Utilisateur>);
  static copyOf(source: Utilisateur, mutator: (draft: MutableModel<Utilisateur>) => MutableModel<Utilisateur> | void): Utilisateur;
}
