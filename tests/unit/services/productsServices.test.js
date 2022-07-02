const { expect, use } = require('chai');
const sinon = require('sinon');
/* const NotFoundError = require('../../errors/NotFoundError'); */
const chaiAsPromised = require('chai-as-promised')

const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

use(chaiAsPromised);

describe('productsServices', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('quando é inserido com sucesso', () => {
    const payloadMovie = {
      name: 'Example Product',
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(productsModels, 'createProduct')
        .resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      productsModels.createProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.createProduct(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsServices.createProduct(payloadMovie);

      expect(response).to.have.a.property('id');
    });

  });

/*   describe('#validateParamsId', function () {
    it('se mandar um id válido deve retornar um objeto válido', function () {
      const object = productsServices.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });
 */
/*     it('se mandar um id inválido deve disparar um erro', function () {
      expect(() => productsServices.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    }); */
  });

/*   describe('#validateBody', function () {
    it('se mandar um objeto válido deve retonar um objeto válido', function () {
      const object = productsServices.validateBody({ name: 'Quentin Tarantino' });
      expect(object).to.be.deep.eq({ name: 'Quentin Tarantino' });
    });

    it('se mandar um nome vazio no body deve disparar um erro', function () {
      expect(() => productsServices.validateBody({ name: '' })).to
        .throws('"name" is not allowed to be empty');
    });

    it('se mandar um objeto sem nome no body deve disparar um erro', function () {
      expect(() => productsServices.validateBody({})).to
        .throws('"name" is required');
    });
  }); */

describe('#checkIfExists', () => {
  const NotFoundError = 404
    it('ao passar um id que existe', async () => {
      sinon.stub(productsModels, 'exists').resolves(true);
      const exists = await productsServices.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('ao passar um id que não existe', () => {
      sinon.stub(productsModels, 'exists').resolves(false);
      expect(productsServices.checkIfExists(1001)).to.be
        .rejectedWith(NotFoundError)
    });
  });

  /* describe('#edit', function () {
    it('ao tentar editar um diretor mandando um objeto deve editar', async function () {
      sinon.stub(productsModels, 'edit').resolves(true);
      const updated = await productsServices.edit(1, { name: 'Quentin Tarantino' });
      expect(updated).to.be.eq(true);

    });

    it('ao tentar editar um diretor mandando um objeto sem nome n deve editar', async function () {
      sinon.stub(productsModels, 'edit').resolves(true);
      const updated = await productsServices.edit(1, {});
      expect(updated).to.be.eq(false);
    });
  }); */
