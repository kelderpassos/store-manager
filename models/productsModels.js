const connection = require('./connection');

const productsModels = {
  getAll: async () => {
    const query = "SELECT * FROM StoreManager.products ORDER BY id;";
    const [queryResult] = await connection.query(query);
    return queryResult;
  },
  findById: async (id) => {
    const query = "SELECT * FROM StoreManager.products WHERE id=?;";
    const [[queryResult]] = await connection.query(query, [id]);

    return queryResult;
  },

  createProduct: async (productName) => {
    const command = "INSERT INTO StoreManager.products (name) VALUES (?)";
    const [commandResult] = await connection.execute(command, [productName]);

    console.log();

    return { id: commandResult.insertId, name: productName };
  },

  updateProduct: async (productName, id) => {
    const command = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.execute(command, [productName, id]);

    console.log(productName);

    return { id, name: productName };
  },
};

module.exports = productsModels;