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
    const everyProduct = await productsModels.getAll();
    const existingProduct = everyProduct.filter((product) => product.id === Number(id));

    if (existingProduct.length < 1) {
      return { message: 'Product not found' };
    }

    const productUpdated = await productsModels.updateProduct(newInfo, id);
    return productUpdated;
  },

  deleteById: async (id) => {
    const everyProduct = await productsModels.getAll();
    const existingProduct = everyProduct.filter((product) => product.id === Number(id));
   
    if (existingProduct.length < 1) {
      return { message: 'Product not found' };
    }

    return productsModels.deleteById(id);
  },
};

module.exports = productsServices;
