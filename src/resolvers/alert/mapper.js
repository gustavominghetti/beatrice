const alertMapper = (doc) => {
  const data = doc.data ? doc.data() : doc;
  return {
    id: doc.id,
    enclosureId: data.enclosureId || '',
    enclosureName: data.enclosureName || '',
    variable: data.variable || '',
    severity: data.severity || 'warning',
    timestamp: data.timestamp || new Date().toISOString(),
    resolved: data.resolved || false
  };
};

module.exports = { alertMapper };