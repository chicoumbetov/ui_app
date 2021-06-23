"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPendingInvitationsByEmail = void 0;
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
