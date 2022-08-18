const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

describe('Get and manipulate products from database', () => {
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

  describe('Create a new product', () => {
    const mock = { name: 'Fuzil do Justiceiro' };
    const mockExecute = [{ insertId: 1 }];

    before(async () => {
      sinon.stub(connection, "execute").resolves(mockExecute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('should increase the quantity of ids', async () => {
      const execution = await productsModels.createProduct(mock);
      expect(execution).to.have.a.property('id');
    });
  });

  describe('Update a product info', () => {
    const mock = [{ affectedRows: 1 }];
    const update = { id: 1, name: 'Fuzil do Justiceiro' };

    before(async () => {
      sinon.stub(connection, "execute").resolves([]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('should contain property "name"', async () => {
      const result = await productsModels.updateProduct(update.name, update.id)
      expect(result).to.have.property('name');
    });
  })

  describe('Delete a product from database', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves();
    });

    after(async () => {
      connection.execute.restore();
    });
    
    it("should delete a product from database", async () => {
      const result = await productsModels.deleteById(3);
      expect(result).to.be.equal(undefined);
    });
  });

  describe('Find a product by a search term', () => {
    const mock = [
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ];

    before(async () => {      
      sinon.stub(connection, "execute").resolves([mock]);
    })

    after(() => {      
      connection.execute.restore();
    });
    
    it('returns a product by the searched term', async () => {
      const result = await productsModels.searchByTerm('me');
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('id');
      expect(result[0]).to.have.property('name');
      expect(result).to.be.equal(mock);
    });
  });
});

