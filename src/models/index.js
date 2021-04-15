// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Abonnement = {
  "UN_A_DEUX_BIENS": "UnADeuxBiens",
  "TROIS_A_CINQBIENS": "TroisACinqbiens",
  "PLUS_DE_CINQ_BIENS": "PlusDeCinqBiens"
};

const { AdresseType, Client, Compte } = initSchema(schema);

export {
  AdresseType,
  Client,
  Compte,
  Abonnement
};