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

const checkIfExists = async (name) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [[item]] = await connection.execute(sql, [name]);
  return !!item;
};

const createProduct = async (name) => {
  const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(sql, [name]);
  return insertId;
};

module.exports = {
  getAll,
  getByProductId,
  createProduct,
  checkIfExists,
};