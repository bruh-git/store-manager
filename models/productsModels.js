const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [rows] = await connection.execute(query);

/*   return products.map(({ id, name }) => ({
    id,
    name,
  })); */
  return rows;
};

const getByProductId = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id= ?;';
  const [[product]] = await connection.execute(query, [productId]);

/*   return product.map(({ id, name }) => ({
    id,
    name,
  })); */
  return product;
};

module.exports = {
  getAll,
  getByProductId,
};