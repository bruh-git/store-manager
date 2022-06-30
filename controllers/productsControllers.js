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

const createProduct = async (req, res, _next) => {
  const { name } = req.body;

  await Product.checkIfExists(name);
  const id = await Product.createProduct(name);
  const item = await Product.findById(id);
  if (!name) res.status(400).json({ message: 'name is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: 'name length must be at least 5 characters long' });
  }
  res.status(201).json(item);
};

module.exports = {
  getAll,
  findById,
  createProduct,
};