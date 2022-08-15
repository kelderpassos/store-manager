const { Router } = require('express');
const validations = require('../middlewares/productMiddleware');
const productsControllers = require('../controllers/productsControllers');

const products = Router();

products.get('/', productsControllers.getAll);
products.get('/:id', productsControllers.findById);
products.post('/', validations.isNameFieldValid, productsControllers.createProduct);
products.put('/:id', validations.isNameFieldValid, productsControllers.updateProduct);
products.delete('/:id', productsControllers.deleteById);

module.exports = products;