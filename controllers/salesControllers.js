const salesServices = require('../services/salesServices');

const PRODUCT_NOT_FOUND = 'Product not found';
const SALE_NOT_FOUND = 'Sale not found';

const salesControllers = {
  createSale: async (req, res) => {
    const { body } = req;
    const newSales = await salesServices.createSales(body);

    return res.status(201).json(newSales);
  },

  getEverySale: async (_req, res) => {
    const everySale = await salesServices.getEverySale();

    if (everySale.code) {
      return res.status(everySale.code).json(everySale.message);
    }

    return res.status(200).json(everySale);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const saleById = await salesServices.findById(id);

    if (saleById.length === 0) {
      return res.status(404).json({ message: SALE_NOT_FOUND });
    }
    return res.status(200).json(saleById);
  },

  deleteById: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await salesServices.deleteById(id);
    
    if (!isDeleted) {
      return res.status(404).json({ message: SALE_NOT_FOUND });
    }
    
    return res.status(204).end();
  },

  updateById: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    const updatedSale = await salesServices.updateById(id, body);
    
    if (updatedSale.errorMessage === PRODUCT_NOT_FOUND) {
      return res.status(404).json({ message: PRODUCT_NOT_FOUND });
    }

    if (updatedSale.errorMessage === SALE_NOT_FOUND) {
      return res.status(404).json({ message: SALE_NOT_FOUND });
    }

    return res.status(200).json(updatedSale);
  },
};

module.exports = salesControllers;
