const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');
const validations = require('../middlewares/salesMiddleware');

const sales = Router();

sales.get('/', salesControllers.getEverySale);
sales.get('/:id', salesControllers.findById);
sales.delete('/:id', salesControllers.deleteById);
sales.put('/:id', salesControllers.updateSale);
sales.post('/',
validations.isProductIdValid,
validations.isProductQuantityValid,
salesControllers.createSale);

module.exports = sales;
