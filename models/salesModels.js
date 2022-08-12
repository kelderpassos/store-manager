const connection = require('./connection');

const salesModels = {
  createSales: async (sales) => {    
    const queryDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const queryProductSale = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`;

    const [createDate] = await connection.execute(queryDate);
    
    sales.forEach(async (sale) => {
      await connection.execute(queryProductSale, [
        createDate.insertId, sale.productId, sale.quantity,
      ]);
    });

    // // return { id: commandResult.insertId, name: productName };
    return { id: createDate.insertId, itemsSold: sales };
  },

  getEverySale: async () => {
    const query = 'SELECT * from StoreManager.sales_products';
    const [allProducts] = await connection.execute(query);
    return allProducts;
  },

  getAll: async () => {
    const query = 'SELECT sale_id AS saleId,  FROM StoreManager.sales;';
    const [allSales] = await connection.execute(query);
    console.log(allSales);

    return 'teste';
  },
};

module.exports = salesModels;
