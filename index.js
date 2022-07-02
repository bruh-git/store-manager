const app = require('./app');
require('dotenv').config();
// lê o que está no arquivo .env que são as variaveis de ambiente

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
