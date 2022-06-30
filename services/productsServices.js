/* const Joi = require('joi');
const { runSchema } = require('./validators'); */
const Product = require('../models/productsModels');

const getAll = async () => Product.getAll();

const findById = async (productId) => {
  const product = await Product.getByProductId(productId);
/*   if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  } */
  return product;
};

/* const productService = {
  validateParams: runSchema(Joi.object({
    name: Joi.string()
      .min(5).not().empty()
      .required(),
  })),

  async checkIfExists(id) {
    const exists = await Product.checkIfExists(id);
    if (!exists) {
      return {
        error: {
          code: 'Unprocessable Entity',
          message: 'Product already exists',
        },
      };
    }
  },
}; */
/*   const { error } = Joi.object({
    name: Joi.string()
      .min(5).not().empty()
      .required()
      .messages({
        'any.required': '400|"name is required"',
        'string.min': '422|"name length must be at least 5 characters long"' }),
  }).validate(req.body); */
/*   if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ message });
  } */
/*   if (error) return next(error); */

const checkIfExists = async (name) => {
  const exists = await Product.checkIfExists(name);
  if (exists) {
    return {
      error: {
        code: 'Unprocessable Entity',
        message: 'Product already exists',
      },
    };
  }
};

const createProduct = async (name) => {
  const newProduct = await Product.createProduct(name);

  return newProduct;
};

module.exports = {
  getAll,
  findById,
  createProduct,
  checkIfExists,
};