const Joi = require('joi');
/* const { runSchema } = require('./validators');  */
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

const validate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required() });
  const { error } = schema.validate(data);

  if (error) {
    if (error.details[0].type === 'string.min') error.code = 422;
    throw error;
  }
};
const createProduct = async (name) => {
  validate(name);
  const newProduct = await Product.createProduct(name);

  return newProduct;
};

module.exports = {
  getAll,
  findById,
  createProduct,
  checkIfExists,
  validate,
};