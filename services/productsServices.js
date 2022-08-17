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
    const productById = await productsModels.findById(id);

    if (!productById) {
      return { message: 'Product not found' };
    }

    const productUpdated = await productsModels.updateProduct(newInfo, id);
    return productUpdated;
  },

  deleteById: async (id) => {
    const productById = await productsModels.findById(id);

    if (!productById) {
      return { message: 'Product not found' };
    }

    return productsModels.deleteById(id);
  },

  searchByTerm: async (term) => {    
    console.log('teste services');
    const productByTerm = await productsModels.searchByTerm(term);
    return productByTerm;
  },
};

module.exports = productsServices;
