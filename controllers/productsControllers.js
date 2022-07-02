const productService = require('../services/productsServices');

const productController = {
  create: async (req, res) => {
    const value = await productService.validateBody(req.body);
    const id = await productService.create(value);
    await productService.checkIfExists(id);
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
    const exist = await productService.checkIfExists(id);

    const product = await productService.findById(exist);

    if (!product) {
      throw new Error();
      // error.name = 'NotFoundError';
      // error.message = 'Serie Not Found';
      // throw error;
    }

    res.status(200).json(product);
  },
};

/* createProduct: async (req, res) => {
  const { name } = req.body;

  if (!name) res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  await productService.validate({ name });
  await productService.checkIfExists(name);
  const id = await productService.createProduct(name);
  const item = await productService.findById(id);
  res.status(201).json(item);
}, */
/*
const findById = async (req, res, _next) => {
  const { id } = req.params;

  const product = await productService.findById(id);
  if (product) return res.status(200).json(product);
  res.status(404).json({ message: 'Product not found' });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await productService.checkIfExistsId(id);
  await productService.validateParamsId({ id });
  await productService.remove(id);
  res.status(204).end();
}; */

module.exports = productController;