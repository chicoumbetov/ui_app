"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePendingInvitations = exports.listPendingInvitationsByEmail = void 0;
const graphql_tag_1 = require("graphql-tag");
const listPendingInvitationsByEmail = async (client, pendingEmail) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query PendingInvitationsByEmail(
    $email: String
  ) {
    pendingInvitationsByEmail(
      email: $email
    ) {
      items {
        id
        realEstateId
        email
        type
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
       
        
      }
      nextToken
      startedAt
    }
  }`),
            variables: {
                email: pendingEmail,
            },
            fetchPolicy: 'no-cache',
        });
        console.log('la data: ', data);
        if (data.pendingInvitationsByEmail.items.length > 0) {
            return data.pendingInvitationsByEmail.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listPendingInvitationsByEmail = listPendingInvitationsByEmail;
const deletePendingInvitations = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`
  mutation DeletePendingInvitation(
    $input: DeletePendingInvitationInput!
    $condition: ModelPendingInvitationConditionInput
  ) {
    deletePendingInvitation(input: $input, condition: $condition) {
      id
      realEstateId
      email
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`),
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.updateRealEstateBankAccount) {
            return data.updateRealEstateBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.deletePendingInvitations = deletePendingInvitations;
