const salesServices = require('../services/salesServices');

const salesControllers = {
  createSale: async (req, res) => {
    const { body } = req;
    const newSales = await salesServices.createSales(body);

    return res.status(201).json(newSales);
  },

  getEverySale: async (_req, res) => {
    const everySale = await salesServices.getEverySale();
    
    if (!everySale) {
      return res.status(everySale.code).json(everySale.message);
    }

    return res.status(200).json(everySale);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const saleById = await salesServices.findById(id);

    if (saleById.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(saleById);
  },
};

module.exports = salesControllers;
