"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = void 0;
const graphql_tag_1 = require("graphql-tag");
const getUserById = async (client, id) => {
    const { data } = await client.query({
        query: graphql_tag_1.default(`query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          biToken
        }
      }`),
        variables: {
            id,
        },
        fetchPolicy: 'no-cache',
    });
    return data;
};
exports.getUserById = getUserById;
const getUserByEmail = async (client, email) => {
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
};
exports.getUserByEmail = getUserByEmail;
