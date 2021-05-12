// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Abonnement = {
  "UN_A_DEUX_BIENS": "UnADeuxBiens",
  "TROIS_A_CINQBIENS": "TroisACinqbiens",
  "PLUS_DE_CINQ_BIENS": "PlusDeCinqBiens"
};

const { Utilisateur, Adresse } = initSchema(schema);

export {
  Utilisateur,
  Abonnement,
  Adresse
};
