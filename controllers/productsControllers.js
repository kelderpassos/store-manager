const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async () => {
    await productsServices.getAll();
  },
  findById: async (id) => {
    await productsServices.findById(id);
  },
};

module.exports = productsControllers;