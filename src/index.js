require('dotenv').config();

try {
  const startApp = require('./app');
  const port = process.env.PORT || 4000;

  startApp().then((app) => {
    app.listen({ port }, () => {
      console.log(`🚀 Boraaaaaaaaaaa! Teste aqui: http://localhost:${port}/graphql`);
    });
  }).catch(err => {
    console.error("❌ Erro ao iniciar o servidor (async):", err);
    process.exit(1);
  });
} catch (err) {
  console.error("❌ Erro fatal na inicialização:", err);
  process.exit(1);
}