const { Router } = require('express');
const rescue = require('express-rescue');

const productController = require('../controllers/productsControllers');

const router = Router();

router.get('/', rescue(productController.list));
router.post('/', rescue(productController.create));
router.get('/:id', productController.findById);
/* router.delete('/products/:id', rescue(productController.remove)); */

module.exports = router;