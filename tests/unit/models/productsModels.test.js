const chaiAsPromised = require('chai-as-promised')
const { expect, use } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModels');
const { listMock, mockObj } = require('../mocks/product.mock');

use(chaiAsPromised);

describe('Products,', () => {
  beforeEach(() =>sinon.restore());

  describe('#create', () => {
    it('ao enviar um obj com o atributo name deve salvar os dados e retornar o id', async () => {
      const expecteId = 1
      sinon.stub(connection, 'execute').resolves([{ insertId: expecteId }]);
      const id = await productModel.create({ name: 'Arcos' });
      expect(id).to.be.eq(expecteId)
    })
    it('ao enviar um obj sem o atributo name deve retornar o nulo', async () => {
      const value = await productModel.create({ });
      expect(value).to.be.eq(null)
    })
  })
  describe('#list',() => {
    it('deve retornar um array',() => {
      const mockData = listMock;
      sinon.stub(connection, 'execute').resolves([mockData]);
      expect(productModel.list()).to.eventually.deep.equal(mockData);
      /* const products = await productModel.list();
      expect(products).to.deep.eq(mockData); */
      // to.deep ignora a ordem dos atributos
    })
    it('deve falhar se despara error',()=>{
      sinon.stub(connection, 'execute').rejects();
      expect(productModel.list()).to.eventually.rejected;
    })
  })
  describe('#findById', () => {
    it('deve retornar um objeto se o connection.execute retornar uma array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      expect(productModel.findById(2)).to
        .eventually.be.deep.eq(mockObj);
    });

    it('deve retornar undefined se o connection.execute retornar uma array vazia', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const product = await productModel.findById(2);
      expect(product).to.be.undefined;
    });
  })
});

/* describe('Insere um novo produto no BD', () => {
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

  describe('#edit', function () {
      it('deve ser capaz de editar se mandar um id e um objeto', async function () {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
        const value = await productsModels.edit(1, { name: 'Quentin Tarantino' });
        expect(value).to.be.eq(true);
      });
    });

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

}); */