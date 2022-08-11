const connection = require('./connection');

const productsModels = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products;';
    const [queryResult] = await connection.query(query);
    return queryResult;
  },
  findById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
    const [queryResult] = await connection.query(query, [id]);
    return queryResult;
  },
};

module.exports = productsModels;