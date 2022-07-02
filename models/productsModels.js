const connection = require('./connection');

const productModel = {
  create: async ({ name }) => {
    if (!name) return null;
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(sql, [name]);
    return insertId;
  },
  list: async () => {
    const query = 'SELECT * FROM StoreManager.products;';
    const [rows] = await connection.execute(query);

    return rows;
  },
  findById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id= ?';
    const [[product]] = await connection.execute(query, [id]);

    return product;
  },
  checkIfExists: async (name) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE name = ?';
    const [[item]] = await connection.execute(sql, [name]);
    return !!item;
  },
};

/* 

const checkIfExistsId = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[item]] = await connection.execute(sql, [id]);
  return !!item;
};

const remove = async (id) => {
  const sql = `
      DELETE FROM StoreManager.products
      WHERE id = ?
    `;
  await connection.query(sql, [id]);
};

const edit = async (id, changes) => {
  const sql = `
      UPDATE StoreManager.products
      SET ? 
      WHERE id = ?
    `;
  await connection.query(sql, [changes, id]);
}; */

module.exports = productModel;