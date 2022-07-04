const Joi = require('joi');
/* const NotFoundError = require('../middlewares/error'); */
/* const { runSchema } = require('./validators'); */
const productModel = require('../models/productsModels');

const productService = {
  validateParamsId: (params) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    return value;
  },

  validateBody: async (params) => {
    const schema = Joi.object({
      name: Joi.string()
        .required().min(5).not()
        .empty(),
    });
    const { error, value } = schema.validate(params);

    if (error) {
      if (error.details[0].type === 'string.min') error.code = 422;
      throw error;
    }
    return value;
  },

  create: async ({ name }) => {
    await productModel.checkIfExists({ name });
    const id = await productModel.create({ name });
    return id;
  },

  list: async () => {
    const products = await productModel.list();
    return products;
  },
  
  findById: async (id) => {
    if (!id) {
      return {
        error: {
          code: 'notFound',
          message: 'Product not found',
        },
      };
    }
    const product = await productModel.findById(id);
    return product;
  },
  delete: async (id) => {
    await productModel.delete(id);
  },
  edit: async (id, changes) => {
    await productModel.edit(id, changes);
    return { id, ...changes };
  },
};
  // checkIfExists: async (name) => {
   // const exists = await productModel.checkIfExists(name);
    // if (exists) {
      // throw new Error();
      /* return {
        error: {
          code: 'Unprocessable Entity',
          message: 'Product already exists',
        },
      }; */
    // }
  // },

/* 
const findById = async (productId) => {
  const product = await Product.getByProductId(productId); */
/*   if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  } */
/*   return product;
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

/* const checkIfExists = async (name) => {
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

const checkIfExistsId = async (id) => {
  const exists = await Product.checkIfExistsId(id);
  if (!exists) {
    throw new NotFoundError('Product not found');
  } */
/*   if (exists) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  } */
/* }; */

/* const validate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required() });
  const { error } = schema.validate(data);

  if (error) {
    if (error.details[0].type === 'string.min') error.code = 422;
    throw error;
  }
};

const remove = async (id) => {
  const exists = await Product.checkIfExistsId(id);
  await Product.remove(exists);
}; */

module.exports = productService;