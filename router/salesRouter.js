const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const sales = Router();

sales.get('/', salesControllers.getAll);
sales.get('/:id', salesControllers.findById);
sales.post(
  '/',
  salesControllers.createProduct,
);

module.exports = sales;
