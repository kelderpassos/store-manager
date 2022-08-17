const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');
const validations = require('../middlewares/salesMiddleware');

const sales = Router();

sales.get('/', salesControllers.getEverySale);
sales.get('/:id', salesControllers.findById);
sales.delete('/:id', salesControllers.deleteById);

sales.post('/',
validations.isProductIdValid,
validations.isProductQuantityValid,
salesControllers.createSale);

sales.put(
  '/:id',
  validations.isProductIdValid,
  validations.isProductQuantityValid,
  salesControllers.updateById,
);

module.exports = sales;
