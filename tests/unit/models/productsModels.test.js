const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const productsModels = require('../../models/productsModels');

describe('Insere um novo produto no BD', () => {
  const payloadMovie = {
    name: 'Example Product',
  };

  before(async () => {
    const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModels.createProduct(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsModels.createProduct(payloadMovie);

      expect(response).to.have.a.property('id');
    });

  });
});

  describe('productModel', function () {
    beforeEach(function () {
      sinon.restore();
    });

  describe('#exists', function () {
    it('ao mandar um id de um registro que existe deve retornar `true`', async function () {
      sinon.stub(connection, 'query').resolves([[{ id: 1, name: 'Quentin Tarantino' }]]);
      const exists = await productsModels.checkIfExists(1);
      expect(exists).to.be.equal(true);
    });

    it('ao mandar um id de um registro que não existe deve retornar `false`', async function () {
      sinon.stub(connection, 'query').resolves([[]]);
      const exists = await productsModels.checkIfExists(1001);
      expect(exists).to.be.equal(false);
    });
  });

  /*   describe('#edit', function () {
      it('deve ser capaz de editar se mandar um id e um objeto', async function () {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
        const value = await productsModels.edit(1, { name: 'Quentin Tarantino' });
        expect(value).to.be.eq(true);
      });
    }); */

  describe('Busca apenas um filme no BD por seu ID', () => {
    before(async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando não existe um filme com o ID informado', () => {
      it('retorna null', async () => {
        const response = await MoviesModel.getByProductId();
        expect(response).to.be.equal(null);
      });
    });

    describe('quando existe um filme com o ID informado', () => {

      before(() => {
        sinon.stub(productsModels, 'getByProductId')
          .resolves(
            {
              id: 1,
              name: 'Example Movie',
            }
          );
      });

      after(() => {
        productsModels.getByProductId.restore();
      });

      it('retorna um objeto', async () => {
        const response = await productsModels.getByProductId(1);

        expect(response).to.be.an('array');
      });

      it('o objeto não está vazio', async () => {
        const response = await productsModels.getByProductId(1);

        expect(response).to.be.not.empty;
      });

      it('tal objeto possui as propriedades: "id" e "name"', async () => {
        const item = await productsModels.getByProductId(1);

        expect(item).to.include.all.keys('id', 'name');
      });
    });
  });

});