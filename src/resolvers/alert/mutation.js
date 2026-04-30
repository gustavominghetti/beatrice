const db = require('../../config/firebase');
const { alertMapper } = require('./mapper');

const seedAlertsData = [
  {
    enclosureId: 'rec_01',
    enclosureName: 'Onça Pintada',
    variable: 'Temperatura Alta',
    severity: 'critical',
    timestamp: new Date().toISOString(),
    resolved: false
  }
];

const alertMutations = {
  resolveAlert: async (_, { alertId }) => {
    try {
      const alertRef = db.collection('alerts').doc(alertId);
      const alertDoc = await alertRef.get();

      if (!alertDoc.exists) {
        throw new Error('Alerta não encontrado.');
      }

      await alertRef.update({ resolved: true });

      const updatedDoc = await alertRef.get();
      return alertMapper(updatedDoc);
    } catch (error) {
      console.error('Erro ao resolver alerta:', error);
      throw new Error(error.message);
    }
  },

  createAlert: async (_, { input }) => {
    try {
      const newAlert = {
        ...input,
        timestamp: new Date().toISOString(),
        resolved: false
      };

      const docRef = await db.collection('alerts').add(newAlert);
      const savedDoc = await docRef.get();

      return alertMapper(savedDoc);
    } catch (error) {
      console.error('Erro ao criar alerta:', error);
      throw new Error('Erro ao criar alerta.');
    }
  },

  seedAlerts: async () => {
    try {
      const createdAlerts = [];

      for (const alert of seedAlertsData) {
        const docRef = await db.collection('alerts').add(alert);
        const savedDoc = await docRef.get();
        createdAlerts.push(alertMapper(savedDoc));
      }

      console.log('✅ Seed de alertas criado com sucesso!');
      return createdAlerts;
    } catch (error) {
      console.error('Erro ao criar seed de alertas:', error);
      throw new Error('Erro ao criar seed de alertas.');
    }
  }
};

module.exports = alertMutations;