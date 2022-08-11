const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (req, res) => {
    const products = await productsServices.getAll();
    return res.status(200).json(products);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const productById = await productsServices.findById(id);

    if (!productById) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(productById);
  },

  createProduct: async (req, res) => {
    const { name } = req.body;

    const newProduct = await productsServices.createProduct(name);
    console.log(newProduct);

    return res.status(201).json(newProduct);
  },
};

module.exports = productsControllers;
