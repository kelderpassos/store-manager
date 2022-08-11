const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const products = Router();

products.get('/', productsControllers.getAll);
products.get('/:id', productsControllers.findById);
products.post('/', productsControllers.createProduct);

module.exports = products;