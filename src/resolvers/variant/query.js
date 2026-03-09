const db = require('../../config/firebase');
const { variantMapper } = require('./mapper');

const variantQueries = {
  latestVariants: async (_, { enclosureId, limit = 10 }) => {
    try {
      const snapshot = await db.collection('variants')
        .where('enclosureId', '==', enclosureId)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      return snapshot.docs.map(doc => variantMapper(doc));
    } catch (error) {
      console.error("Erro ao buscar variantes:", error);
      throw new Error("Erro ao carregar dados do recinto.");
    }
  }
};

module.exports = variantQueries;