const connection = require('./connection');

const productsModels = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
    const [queryResult] = await connection.query(query);
    return queryResult;
  },

  findById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
    const [[queryResult]] = await connection.query(query, [id]);

    return queryResult;
  },

  createProduct: async (productName) => {
    const command = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [commandResult] = await connection.execute(command, [productName]);

    return { id: commandResult.insertId, name: productName };
  },

  updateProduct: async (productName, id) => {
    const command = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.execute(command, [productName, id]);

    return { id, name: productName };
  },

  deleteById: async (id) => {
    const command = 'DELETE FROM StoreManager.products WHERE id = ?;';
    return connection.execute(command, [id]);
  },

  searchByTerm: async (term) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?; ';

    const [productByTerm] = await connection.execute(query, [`%${term}%`]);

    return productByTerm;
  },
};

module.exports = productsModels;