const productService = require('../services/productsServices');

const productController = {
  create: async (req, res) => {
    const value = await productService.validateBody(req.body);
    const id = await productService.create(value);
    const productCreated = { id, ...value };
    // junta o obj com o id e os parametros que foram validados
    res.status(201).json(productCreated);
  },
  list: async (_req, res) => {
  const product = await productService.list();
  return res.status(200).json(product);
  },
  findById: async (req, res) => {
    const { id } = productService.validateParamsId(req.params);
    
    const product = await productService.findById(id);

    if (product) return res.status(200).json(product);

    res.status(404).json({ message: 'Product not found' });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const product = await productService.findById(id);

    if (!product) res.status(404).json({ message: 'Product not found' });
    
    await productService.delete(id);
    res.status(204).send();
    /* res.sendStatus(204); */
    /* res.status(204).end(); */
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const idValid = await productService.findById(id);

    if (!idValid) res.status(404).json({ message: 'Product not found' });
    await productService.validateBody({ name });

    const product = await productService.edit(id, { name });

    res.status(200).json(product);
  },
};

module.exports = productController;