const Product = require('../models/productsModels');

const getAll = async () => Product.getAll();

const findById = async (productId) => {
  const product = await Product.getByProductId(productId);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};
