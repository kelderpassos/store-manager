const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const products = Router();

products.get('/', productsControllers.getAll);
products.get('/products/:id', productsControllers.findById);

module.exports = products;