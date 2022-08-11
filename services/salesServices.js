const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (newSales) => {
    const newProduct = await salesModels.createSales(newSales);
    return newProduct;
  },
};

module.exports = productsServices;
