const productsModels = require('../models/productsModels');

const productsServices = {
  // validateId: (id) => {
  //   const productById = productsModels.findById(id);

  //   // if (!productById) {
  //   //   return 
  //   // }
  // },

  getAll: async () => {
    const products = await productsModels.getAll();
    return products;
  },

  findById: async (id) => {
    const productById = await productsModels.findById(id);
    
    return productById;
  },
};

module.exports = productsServices;
