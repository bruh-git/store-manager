const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const app = express();
const Product = require('./controllers/productsControllers');
const errorMiddleware = require('./middlewares/error');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.use(bodyParser.json());
app.use(errorMiddleware);

app.get('/products', rescue(Product.getAll));
app.get('/products/:id', rescue(Product.findById));
app.post('/products', rescue(Product.createProduct));

module.exports = app;