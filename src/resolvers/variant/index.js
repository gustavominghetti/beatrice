const variantQueries = require('./query');
const variantMutations = require('./mutation');

module.exports = {
  Query: {
    ...variantQueries
  },
  Mutation: {
    ...variantMutations
  }
};