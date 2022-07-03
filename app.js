const express = require('express');
const bodyParser = require('body-parser');
/* const rescue = require('express-rescue'); */
const app = express();
app.use(bodyParser.json());

const productsRouter = require('./routes/productsRouter');
/* const errorMiddleware = require('./middlewares/error'); */

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.use('/products', productsRouter);

app.use((err, _req, res, _next) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(err.code || 400).json({ message: err.message });
    case 'NotFoundError':
      return res.status(404).json({ message: err.message });
    default: res.sendStatus(500);
  }
});

module.exports = app;