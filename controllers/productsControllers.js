const Product = require('../services/productsServices');

const getAll = async (_req, res) => {
  const product = await Product.getAll();

  return res.status(200).json(product);
};

const findById = async (req, res, _next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (product) return res.status(200).json(product);
  res.status(404).json({ message: 'Product not found' });
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  if (!name) res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  await Product.validate({ name });
  await Product.checkIfExists(name);
  const id = await Product.createProduct(name);
  const item = await Product.findById(id);
  res.status(201).json(item);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Product.checkIfExistsId(id);
  await Product.movieService.validateParamsId({ id });
  await Product.remove(id);
  res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  createProduct,
  remove,
};