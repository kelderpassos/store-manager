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

  updateById: async (saleId, newInfo) => {
    const everySale = await salesModels.getEverySale();  
    console.log(everySale);
    const nonExistingId = everySale.filter(({ productId }) =>
     Number(saleId) <= productId);

    const existingProducts = newInfo.filter(
      ({ productId }) => productId > everySale.length,
    );
    
    if (nonExistingId.length === 0) return { errorMessage: 'Sale not found' };
    if (existingProducts.length > 0) {
      return { errorMessage: 'Product not found' };
    }
    
    const updatedSale = await salesModels.updateById(saleId, newInfo);
    
    if (!updatedSale) return null;

    return updatedSale;
  },
};

module.exports = productsServices;
