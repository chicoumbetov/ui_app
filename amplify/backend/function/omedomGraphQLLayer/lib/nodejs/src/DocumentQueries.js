"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocument = void 0;
const graphql_tag_1 = require("graphql-tag");
const getDocument = async (client, id) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      realEstateId
      realEstate {
        admins
        shared
      }
      name
      key
      s3file
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`),
            variables: {
                id,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.getDocument) {
            return data.getDocument;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.getDocument = getDocument;
