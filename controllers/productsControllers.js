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
/*   const schema = Joi.object({
    name: Joi.string().min(5).required().messages({
      'any.required': '400|"name is required"',
      'string.min': '422|"name length must be at least 5 characters long"',
    }),
  });
  const { error } = schema.validate(name);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ message });
  } */
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

module.exports = {
  getAll,
  findById,
  createProduct,
};