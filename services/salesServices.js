const salesModels = require('../models/salesModels');

const salesServices = {
  createSales: async (sales) => {
    await Promise.all(
      sales.map(({ productId }) => salesModels.checkIfExists(productId)),
    );

    const createdSales = await salesModels.createSale(sales);
    return createdSales;
  },

  getEverySale: async () => {
    const everySale = await salesModels.getEverySale();
    if (everySale === null) {
      return { code: 404, message: 'Sale not found' };
    }

    return everySale;
  },

  findById: async (id) => {
    const saleById = await salesModels.findById(id);
    return saleById;
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

module.exports = salesServices;
