const chaiAsPromised = require('chai-as-promised')
// usa em caso de funções que disparam inserções (throw)
const { expect, use } = require('chai');
const sinon = require('sinon');
const { ValidationError } = require('joi');
const productService = require('../../../services/productsServices');
const productModel = require('../../../models/productsModels');
const { listMock, mockObj } = require('../mocks/product.mock');

use(chaiAsPromised);

describe('productsServices',() => {
  before(() => {
      sinon.restore();
    })

  describe('#create', () => {
    it('se valído, deve salvar no banco', async () => {
      sinon.stub(productModel, 'create').resolves(1);
      const id = await productService.create({ name: 'Arcor' })
      expect(id).to.be.eq(1)
    })
  })
  describe('#validateBody', () => {
    it('ao mandar um objeto válido', async() => {
      const validData = { name: 'Arcor' };
      const value = await productService.validateBody(validData);
      expect(value).to.be.deep.eq(validData);
    })
    it('ao mandar um objeto inválido', async () => {
      const invalidData = { name: '' };
      expect(productService.validateBody(invalidData))
        .to.be.rejectedWith(ValidationError);
    })
  })
  describe('#list', () => {
    it('deve retornar um array de o model retornar uma array', async() => {
      sinon.stub(productModel, 'list').resolves(listMock);
      expect(productService.list()).to.eventually.deep.equal(listMock);
    })
  })
  describe('#findById', () => {
    it('deve retornar um objeto se o model retornar esse objeto', () => {
      sinon.stub(productModel, 'findById').resolves(mockObj);
      expect(productService.findById(2)).to.eventually.deep.equal(mockObj);
    });
    /* it('ao mandar um objeto inválido', async () => {
      sinon.stub(productModel, 'findById').resolves();
      const invalidId = { id: '' };
      expect(productService.findById(invalidId))
        .to.be.rejectedWith(ValidationError);
    }) */
  })

  describe('#validateParamsId', () => {
    it('se mandar um id válido deve retornar um objeto válido', () => {
      const object = productService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });
    it('se mandar um id inválido deve disparar um erro', function () {
      expect(() => productService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    }); 
});

  describe('#edit',() => {
    it('ao tentar editar um produto mandando um objeto deve editar', async () =>{
      sinon.stub(productModel, 'edit').resolves();
      const updated = await productService.edit( 1, { name: 'Quentin' });
      expect(updated).to.be.deep.eq({ id: 1, name: 'Quentin' });
    });
  });
  describe('#delete', () => {
    it('ao tentar deletar um produto mandando um objeto deve editar', async () => {
      sinon.stub(productModel, 'delete').resolves();
      const delet = await productService.delete(1);
      expect(delet).to.be.undefined;
    });
  });
})
