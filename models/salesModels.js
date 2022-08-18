const connection = require('./connection');

const salesModels = {
  createSale: async (sales) => {
    const queryDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const queryProductSale = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`;

    const [{ insertId }] = await connection.execute(queryDate);

    await sales.map(async (sale) => {
      await connection.execute(queryProductSale, [
        insertId,
        sale.productId,
        sale.quantity,
      ]);
    });

    return { id: insertId, itemsSold: sales };
  },

  getEverySale: async () => {
    const query = `SELECT s.id AS saleId, s.date AS date,
    sp.product_id AS productId, sp.quantity AS quantity 
    FROM StoreManager.sales AS s, StoreManager.sales_products AS sp
    WHERE s.id = sp.sale_id `;

    const [allProducts] = await connection.execute(query);
    if (allProducts === undefined) return null;

    return allProducts;
  },

  findById: async (id) => {
    const query = `SELECT s.date AS date,
    sp.product_id AS productId, sp.quantity AS quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`;

    const [saleById] = await connection.execute(query, [id]);
    console.log(saleById);
    return saleById;
  },

  deleteById: async (id) => {
    const commandSales = 'DELETE FROM StoreManager.sales WHERE id = ?;';

    const [{ affectedRows }] = await connection.execute(commandSales, [id]);
    console.log(affectedRows);
    return !!affectedRows;
  },

  updateById: async (saleToBeUpdated, newInfo) => {
    const command = `UPDATE StoreManager.sales_products 
      SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;

    await newInfo.map(async ({ quantity, productId }) =>
      connection.execute(command, [quantity, saleToBeUpdated, productId]));
    
    return { saleId: saleToBeUpdated, itemsUpdated: newInfo };
  },

  checkIfExists: async (id) => {
    const saleById = await salesModels.findById(id);
    if (saleById.length === 0) throw new Error('Product not found');
  },

};

module.exports = salesModels;
