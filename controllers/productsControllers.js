const Joi = require('joi');
const Product = require('../services/productsServices');

const getAll = async (_req, res) => {
  const product = await Product.getAll();

  return res.status(200).json(product);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const createProduct = async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name } = req.body;

  await Product.checkIfExists(name);
  const id = await Product.createProduct(name);
  const item = await Product.findById(id);
  res.status(201).json(item);
};

module.exports = {
  getAll,
  findById,
  createProduct,
};