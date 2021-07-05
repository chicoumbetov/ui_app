"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = void 0;
const graphql_tag_1 = require("graphql-tag");
const getUserById = async (client, id) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          email
          biToken
          biUser
          expoToken
          privateProfile {
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
          _version
        }
      }`),
            variables: {
                id,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.getUser) {
            return data.getUser;
        }
        return false;
    }
    catch (e) {
        console.error(e);
    }
    return false;
};
exports.getUserById = getUserById;
const getUserByEmail = async (client, email) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query UserByEmail(
    $email: AWSEmail 
  ) {
    userByEmail(
      email: $email
    ) {
      items {
        id
        lastname
        firstname
        email
        expoToken
      }
      nextToken
      startedAt
    }
  }`),
            variables: {
                email,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.userByEmail.items.length > 0) {
            return data.userByEmail.items[0];
        }
        return false;
    }
    catch (e) {
        console.error(e);
    }
};
exports.getUserByEmail = getUserByEmail;
