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