const variantMapper = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    enclosureId: data.enclosureId,
    temperature: data.temperature,
    humidity: data.humidity,
    noises: data.noises,
    luminosity: data.luminosity,
    timestamp: data.timestamp
  };
};

module.exports = { variantMapper };