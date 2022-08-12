const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (sales) => {
    const ids = sales.map((sale) => sale.productId);
    const newProduct = await salesModels.createSales(sales);
    console.log(newProduct);
    const existingIds = newProduct.itemsSold.some(({ productId }) =>
      ids.includes(productId));
    
    console.log(existingIds);
    return newProduct;
  },
};

module.exports = productsServices;
