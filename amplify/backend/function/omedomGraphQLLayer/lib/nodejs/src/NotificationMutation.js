"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMutation = void 0;
const graphql_tag_1 = require("graphql-tag");
const mutationCreateNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
  ) {
    createNotification(input: $input) {
      id
    }
  }
`;
const createNotificationMutation = async (client, input) => {
    await client.mutate({
        mutation: graphql_tag_1.default(mutationCreateNotification),
        variables: {
            input,
        },
        fetchPolicy: 'no-cache',
    });
};
exports.createNotificationMutation = createNotificationMutation;
