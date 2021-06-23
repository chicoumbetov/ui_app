"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const graphql_tag_1 = require("graphql-tag");
const updateUser = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`
  mutation UpdateUser(
    $input: UpdateUserInput!
  ) {
    updateUser(input: $input) {
      id
  }
`),
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.updateUser) {
            return data.updateUser;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateUser = updateUser;
