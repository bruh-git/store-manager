const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon');
const productController = require('../../../controllers/productsControllers');
const productServices = require('../../../services/productsServices')

require('express-async-errors');

use(chaiAsPromised)

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'createProduct')
        .resolves(false);
    });

    after(() => {
      productsServices.createProduct.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "name is required"', async () => {
      await productController.createProduct(request, response);

      expect(response.send.calledWith('name is required')).to.be.equal(true);
    });

  });

  /* describe('productController', function () {
    beforeEach(() => {
      sinon.restore();
    });

    it('ao tentar editar um id inválido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'teste' };

      expect(productController.createProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('ao tentar editar com um body inválido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };
      req.body = {};

      expect(productController.createProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('ao tentar editar com um id e um body válido', async function () {
      const req = {};
      const res = {};

      // spy
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };
      req.body = { name: 'Tarantino' };

      sinon.stub(productServices, 'edit').resolves(true);

      await productController.createProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith({ ok: true })).to.be.equal(true);
    });
  }); */
  describe('quando é inserido com sucesso', () => {
    const response = {}; const request = {};

    before(() => {
      request.body = {
        name: 'Example product',
      };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productServices, 'createProduct')
        .resolves(true);
    });

    after(() => {
      productServices.createProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

  });
});
