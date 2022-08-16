const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (sales) => {
    await Promise.all(
      sales.map(({ productId }) => salesModels.checkIfExists(productId)),
    );

    const newProduct = await salesModels.createSale(sales);
    return newProduct;
  },

  getEverySale: async () => {
    const everySale = await salesModels.getEverySale();
    if (everySale === null) {
      return { code: 404, message: 'Sale not found' };
    }

    return everySale;
  },

  findById: async (id) => {
    const teste = await salesModels.findById(id);
    return teste;
  },
  deleteById: async (id) => {
    const deletedSale = await salesModels.deleteById(id);
  
    if (!deletedSale) {
      return null;
    }

    return deletedSale;
  },

  updateSale: async () => {},
};

module.exports = productsServices;
