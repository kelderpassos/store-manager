const salesServices = require('../services/salesServices');

const salesControllers = {
  createSale: async (req, res) => {
    const [...sales] = req.body;
    const newSales = await salesServices.createProduct(sales);

    return res.status(201).json(newSales);
  },
};

module.exports = salesControllers;
