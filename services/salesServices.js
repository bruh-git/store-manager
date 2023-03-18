/* const Joi = require('joi'); */
const saleModel = require('../models/salesModels');

const saleService = {

/*   validateBody: async (params) => {
    const schema = Joi.object({
      productId: Joi.string()
        .required(),
      quantity: Joi.string()
        .required().min(1),
    });
    const { error, value } = schema.validate(params);

    if (error) {
      if (error.details[0].type === 'string.min') error.code = 422;
      throw error;
    }
    return value;
  }, */

/*   create: async ({ name }) => {
    await saleModel.checkIfExists({ name });
    const id = await saleModel.create({ name });
    return id;
  }, */

  list: async () => {
    const sales = await saleModel.list();
    return sales;
  },

  findById: async (id) => {
    const sale = await saleModel.findById(id);
    return sale;
  },
  /* delete: async (id) => {
    await saleModel.delete(id);
  },
  edit: async (id, changes) => {
    await saleModel.edit(id, changes);
    return { id, ...changes };
  }, */
};

module.exports = saleService;