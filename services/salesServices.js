const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (sales) => {
    const newProduct = await salesModels.createSales(sales);
    return newProduct;
  },
};

module.exports = productsServices;
