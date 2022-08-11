const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

describe('Get products from database', () => {
  describe('Get every product from database', () => {
    const mock = [[
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ]];

    before(async () => {
      sinon.stub(connection, 'query').resolves(mock);
    });
    
    after(async () => {
      connection.query.restore();
    });

    it('returns an array', async () => {
      const response = await productsModels.getAll();
      expect(response).to.be.an('array');
    });
  });

  describe('Get a product by its id', () => {
    const mock = [[{ id: 1, name: "Martelo de Thor" }]];
    const id = 1;

    before(async () => {
      sinon.stub(connection, 'query').resolves(mock);
    });

    after(async () => {
      connection.query.restore();
    });

    it('returns an object', async () => {
      const response = await productsModels.findById(id);
      expect(response).to.be.an('object');
    })
  });

  
});
