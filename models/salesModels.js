const connection = require('./connection');

const saleModel = {
/*   create: async () => {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.execute(sql);
    return insertId;
  }, */
  list: async () => {
    const sql = `SELECT 
s.id AS saleId,
s.date,
sp.product_id AS productId,
sp.quantity
FROM 
StoreManager.sales AS s
INNER JOIN
StoreManager.sales_products AS sp
ON s.id = sp.sale_id
ORDER BY sp.sale_id ASC, sp.product_id
;`;
    const [rows] = await connection.query(sql);

    return rows;
  },
  findById: async (id) => {
    const sql = `SELECT
s.date,
sp.product_id AS productId,
sp.quantity
FROM
StoreManager.sales AS s
INNER JOIN
StoreManager.sales_products AS sp
ON s.id = sp.sale_id
WHERE s.id =?
ORDER BY sp.sale_id ASC, sp.product_id
;`;
    const [sale] = await connection.query(sql, [id]);

    return sale;
  },
/*   checkIfExists: async (name) => {
    const sql = 'SELECT * FROM StoreManager.sales WHERE name=?';
    const [[item]] = await connection.execute(sql, [name]);
    return !!item;
  }, */
/*   edit: async (id, changes) => {
    const sql = `
      UPDATE StoreManager.sales
      SET ? 
      WHERE id = ?
    `;
    await connection.query(sql, [changes, id]);
  }, */
  /* delete: async (id) => {
    const sql = `
      DELETE FROM StoreManager.sales
      WHERE id = ?
    `;
    await connection.query(sql, [id]);
  }, */
};

module.exports = saleModel;