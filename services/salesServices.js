const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (sales) => {
    await Promise
      .all(sales.map(({ productId }) => salesModels.checkIfExists(productId)));

    const newProduct = await salesModels.createSale(sales);
    return newProduct;
  },

  getEverySale: async () => {
    const everySale = await salesModels.getEverySale();
    if (everySale === null) {
      return { code: 400, message: 'Sale not found' };
    }

    return everySale;
  },

  findById: async (id) => {
    await salesModels.findById(id);
  },
};

module.exports = productsServices;
