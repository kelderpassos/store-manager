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
    console.log(queryResult);

    return queryResult;
  },
};

module.exports = productsModels;