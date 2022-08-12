const salesModels = require('../models/salesModels');

const productsServices = {
  createSales: async (sales) => {
    const allProducts = await salesModels.getEverySale();

    const ids = sales.map((sale) => sale.productId);
    const existingIds = allProducts
      .some(({ productId }) => ids.includes(productId));
    if (!existingIds) {
      return { code: 404, errorMessage: 'Product not found' };
    }

    const newProduct = await salesModels.createSales(sales);    
    return newProduct;
  },

  getAll: async () => salesModels.getAll(),
};

module.exports = productsServices;
