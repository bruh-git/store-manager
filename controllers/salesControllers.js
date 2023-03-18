const saleService = require('../services/salesServices');

const saleController = {
/*   create: async (req, res) => {
    const value = await saleService.validateBody(req.body);
    const id = await saleService.create(value);
    const saleCreated = { id, ...value };
    // junta o obj com o id e os parametros que foram validados
    res.status(201).json(saleCreated);
  }, */
  list: async (_req, res) => {
    const sale = await saleService.list();
    return res.status(200).json(sale);
  },
  findById: async (req, res) => {
    const { id } = (req.params);

    const sale = await saleService.findById(id);

    if (!sale.length) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json(sale);
  },
  /* delete: async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.findById(id);

    if (!sale) res.status(404).json({ message: 'Sale not found' });

    await saleService.delete(id);
    res.status(204).send();
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const idValid = await saleService.findById(id);

    if (!idValid) res.status(404).json({ message: 'Sale not found' });
    await saleService.validateBody({ name });

    const sale = await saleService.edit(id, { name });

    res.status(200).json(sale);
  }, */
};

module.exports = saleController;