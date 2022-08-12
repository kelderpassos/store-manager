const salesServices = require('../services/salesServices');

const salesControllers = {
  createSale: async (req, res) => {
    const { body } = req;
    const newSales = await salesServices.createSales(body);

    return res.status(201).json(newSales);
  },

  findById: async (req, res) => {
    // const { id } = req.params;
    // const productById = await productsServices.findById(id);

    // if (!productById) {
    //   return res.status(404).json({ message: "Product not found" });
    // }

    // return res.status(200).json(productById);
  },
};

module.exports = salesControllers;
