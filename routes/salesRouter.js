const { Router } = require('express');
const rescue = require('express-rescue');

const saleController = require('../controllers/salesControllers');

const router = Router();

router.get('/', rescue(saleController.list));
router.post('/', rescue(saleController.create));
router.get('/:id', rescue(saleController.findById));
router.delete('/:id', rescue(saleController.delete));
router.put('/:id', rescue(saleController.edit));

module.exports = router;