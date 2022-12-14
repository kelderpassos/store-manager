const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const productsServices = require('../../../services/productsServices');
const productsModels = require("../../../models/productsModels");

describe("Get and manipulate products from database", () => {
  describe("Get every product from database", () => {
    const mock = [
      [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ],
    ];

    beforeEach(async () => {
      sinon.restore();
    });

    it("returns an array", async () => {
      sinon.stub(connection, "query").resolves(mock);
      const response = await productsServices.getAll();
      expect(response).to.be.an("array");
    });
  });

  describe("Get a product by its id", () => {
    const mock = [[{ id: 1, name: "Martelo de Thor" }]];
    const id = 1;

    beforeEach(async () => {
      sinon.restore();
    });

    it("returns an object", async () => {
      sinon.stub(connection, "query").resolves(mock);
      const response = await productsServices.findById(id);
      expect(response).to.be.an("object");
    });
  });

  describe("Create a new product", () => {
    const mock = { name: "Fuzil do Justiceiro" };
    const mockExecute = [{ insertId: 1 }];

    before(async () => {
      sinon.restore();
    });

    it("should increase the quantity of ids", async () => {
      sinon.stub(connection, "execute").resolves(mockExecute);
      const execution = await productsServices.createProduct(mock);
      expect(execution).to.have.a.property("id");
    });
  });

  describe('Update the info of a product', () => {
    beforeEach(async () => {
      sinon.restore();
    });
    
    const mock = { id: 3, name: "Fuzil do Capitão América" };

    it('should return an error message', async () => {
      sinon.stub(productsModels, 'findById').resolves(undefined);
      const execution = await productsServices.updateProduct('Fuzil', 999);
      expect(execution).to.have.property('message');
      expect(execution.message).to.equal('Product not found');
    });

    it('should return a product', async () => {
      sinon.stub(productsModels, "findById").resolves(mock);
      sinon.stub(productsModels, 'updateProduct').resolves(mock)
      const execution = await productsServices.updateProduct(mock.name, 3);
      expect(execution).to.have.property('name');
      expect(execution).to.be.eql(mock);
    });
  });

  describe('Delete a product from database', () => {
    beforeEach(async () => {
      sinon.restore();
    });

    it('should return an error message', async () => {
      sinon.stub(productsModels, "findById").resolves(undefined);
      const result = await productsServices.deleteById(999);
      expect(result.message).to.be.equal('Product not found');
    });

    it('should delete a product from database', async () => {
      sinon.stub(productsModels, "findById").resolves([]);
      sinon.stub(productsModels, 'deleteById').resolves([]);
      const result = await productsServices.deleteById(3);
      expect(result).to.be.eql([]);
    });
  });

  describe('Find a product by search term', () => {
    beforeEach(async () => {
      sinon.restore();
    });

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

    it('should return products with the searched term', async () => {
      sinon.stub(connection, 'execute').resolves([mock]);
      const result = await productsServices.searchByTerm('me');
      expect(result).to.be.equal(mock);
    })
  });
});
