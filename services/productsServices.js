const productsModels = require('../models/productsModels');

const productsServices = {
  getAll: async () => {
    await productsModels.getAll();
  },
  findById: async (id) => {
    await productsModels.findById(id);
  },
};

module.exports = productsServices;
