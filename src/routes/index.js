const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'
const passport = require('passport');


const { productIdSchema, updateProductSchema } = require('../utils/schemas/products');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');



//JWT strategy
require('../utils/auth/strategies/jwt');

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json(storeProducts);
  });

  router.get('/products/:id', async (req, res, next) => {
    const { id } = req.params
    const storeProducts = await productService.getProductById(id)
    res.status(200).json(storeProducts);
  });

  router.put('/products/:productId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:products']),
    validationHandler({ productId: productIdSchema }, 'params'), 
    validationHandler(updateProductSchema),
    async (req, res, next) => {
    const { productId } = req.params
    const { body: product } = req
    const storeProducts = await productService.updateProductById({ productId, ...product })
    res.status(200).json(storeProducts);
  });

  router.delete('/products/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:products']),
    validationHandler({ productId: productIdSchema }, 'params'), 
    async (req, res, next) => {
      const { productId } = req.params;
      const storeProducts = await productService.deleteProductById(productId);
      res.status(200).json(storeProducts);
    });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;