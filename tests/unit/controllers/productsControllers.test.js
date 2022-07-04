const chaiAsPromised = require('chai-as-promised')
const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const sinon = require('sinon');
const productController = require('../../../controllers/productsControllers');
const productService = require('../../../services/productsServices');
const { listMock, mockObj } = require('../mocks/product.mock');
const productModel = require('../../../models/productsModels');

require('express-async-errors');

use(chaiAsPromised);

describe('productController',() => {
  beforeEach(() => {
      sinon.restore();
    })
  describe('#create', () => {
    it('ao mandar um req.body válido', async() => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: 'Arcor' }

      sinon.stub(productService, 'create').resolves(1);

      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'Arcor'})).to.be.equal(true);
    })
    it('ao mandar um req.body inválido', () => {
      const req = {};
      const res = {};
      req.body = { name: '' }
      expect(productController.create(req, res))
        .to.rejectedWith(ValidationError);
    })
  })
  describe('#list', () => {
    it('se o service devolve um array chama status 200', async() => {
      sinon.stub(productService, 'list').resolves(listMock);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      await productController.list(req, res);
      expect(res.status.calledWith(200)).to.be.eq(true);
      // calledWith retorna true ou false
      expect(res.json.calledWith(listMock)).to.be.eq(true);
    })
  })
  describe('#findById', () => {
    it('deve chamar res.status com 200 e res.json com o objeto quando o service retornar o objeto procutado', async () => {
      sinon.stub(productService, 'findById').resolves(mockObj);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      await productController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockObj)).to.be.true;
    });
    it('se mandar o id como string deve chamar o res.sendStatus com 405', async () => {
      const req = {};
      const res = {};

      res.sendStatus = sinon.stub();

      req.params = {}

      expect(productController.findById(req, res)).to.
        eventually.rejectedWith(ValidationError);
    })
  })
  describe('#delete', () => {
    it('status 204', async () => {
      const req = {};
      const res = {};
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productModel, 'checkIfExists').resolves();
      sinon.stub(productService, 'delete').resolves();

      await productController.delete(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.called).to.be.true;
    });
  });
})

/* describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const res = {};
    const req = {};

    req.body = {};

    res.status = sinon.stub()
        .returns(res);
    res.send = sinon.stub()
        .returns();

    sinon.stub(productService, 'create').resolves(false);

    it('é chamado o status com o código 400', async () => {
      await productController.create(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "name is required"', async () => {
      await productController.create(req, res);

      expect(res.send.calledWith('name is required')).to.be.equal(true);
    });

  });
}) */
/*
  describe('productController', function () {
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
  });
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
}); */