const db = require('../../config/firebase');
const { variantMapper } = require('./mapper');

const variantMutations = {
  createVariant: async (_, { input }) => {
    try {
      const newVariant = {
        ...input,
        timestamp: new Date().toISOString()
      };

      const docRef = await db.collection('variants').add(newVariant);
      const savedDoc = await docRef.get();

      return variantMapper(savedDoc);
    } catch (error) {
      throw new Error("Falha ao registrar dados do sensor.");
    }
  }
};

module.exports = variantMutations;