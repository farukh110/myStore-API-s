const express = require('express');
const { getProductById, updateProductPrice } = require('../controllers/product');
const router = express.Router();

router.get('/:id', getProductById);
router.put('/:id', updateProductPrice);

module.exports = router;
