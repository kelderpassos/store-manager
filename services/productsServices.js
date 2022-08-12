const productsModels = require('../models/productsModels');

const productsServices = {
  getAll: async () => {
    const products = await productsModels.getAll();
    return products;
  },

  findById: async (id) => {
    const productById = await productsModels.findById(id);
    return productById;
  },

  createProduct: async (productName) => {
    const newProduct = await productsModels.createProduct(productName);
    return newProduct;
  },

  updateProduct: async (newInfo, id) => {
    console.log(newInfo);
    const productUpdated = await productsModels.updateProduct(newInfo, id);

    if (!productUpdated) {
      return null;
    }

    return productUpdated;
  },
};

module.exports = productsServices;
