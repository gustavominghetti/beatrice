const db = require('../../config/firebase');
const { alertMapper } = require('./mapper');

const alertQueries = {
  alerts: async (_, { enclosureId }) => {
    try {
      let query = db.collection('alerts').orderBy('timestamp', 'desc');

      if (enclosureId) {
        query = query.where('enclosureId', '==', enclosureId);
      }

      const snapshot = await query.get();
      return snapshot.docs.map(doc => alertMapper(doc));
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      throw new Error('Erro ao carregar alertas.');
    }
  },

  activeAlerts: async () => {
    try {
      const snapshot = await db.collection('alerts')
        .where('resolved', '==', false)
        .orderBy('timestamp', 'desc')
        .get();

      return snapshot.docs.map(doc => alertMapper(doc));
    } catch (error) {
      console.error('Erro ao buscar alertas ativos:', error);
      throw new Error('Erro ao carregar alertas ativos.');
    }
  }
};

module.exports = alertQueries;