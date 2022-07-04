const { Router } = require('express');
const rescue = require('express-rescue');

const productController = require('../controllers/productsControllers');

const router = Router();

router.get('/', rescue(productController.list));
router.post('/', rescue(productController.create));
router.get('/:id', rescue(productController.findById));
router.delete('/:id', rescue(productController.delete));
router.put('/:id', rescue(productController.edit));

module.exports = router;