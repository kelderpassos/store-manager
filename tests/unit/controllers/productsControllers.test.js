const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

describe('Send the correct responses', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe('Deliver every product from database', () => {
    const mock = [
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
    ];

    it('returns an array with every product', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(mock);

      await productsControllers.getAll(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('returns the correct response status', async () => {
      const req = {}
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(mock);

      await productsControllers.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Deliver a product by its id', () => {
    const mock = [[{ id: 1, name: 'Martelo de Thor' }]];
    
    it('returns an object', async () => {
      const req = {};
      const res = {};
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves(mock);

      await productsControllers.findById(req, res);
    
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('returns the message: "Product not found"', async () => {
      const req = {};
      const res = {};
      req.params = { id: 1 };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves(undefined);

      const response = { message: 'Product not found' }
      await productsControllers.findById(req, res);

      expect(res.json.calledWith(response)).to.be.equal(true);
    });

  });

  describe('Create a new product', () => {
    const mock = { id: 1, name: 'Fuzil do Justiceiro' }; 

    it('returns the created product with an id', async () => {
      const req = {};
      const res = {};
      req.body = { name: 'Fuzil do Justiceiro'};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'createProduct').resolves(mock);

      await productsControllers.createProduct(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });

  describe('Update a product with new info coming from the request', () => {
    const mock = { id: 3, name: 'Fuzil do Capitão América' };
    const errorMessage = { message: 'Product not found' };

    it("returns the product updated with the new info", async () => {
      const req = {};
      const res = {};
      req.body = { name: "Fuzil do Capitão América" };
      req.params = 3;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "updateProduct").resolves(mock);

      await productsControllers.updateProduct(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it("returns an error message", async () => {});
  });

  describe('Delete a product from database', () => {
    it('should return an error message', async () => {

    });

    it('should delete a product from database', async () => {

    });
  });

  describe("Search a product by a search term", () => {
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

    // it("should return every product with the term searched", async () => {
    //   const req = {};
    //   const res = {};
    //   req.query.q = "me";
    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();
    //   sinon.stub(productsServices, 'searchByTerm').resolves(mock);

    //   await productsControllers.updateProduct(req, res);
    //   expect(res.json.calledWith(mock)).to.be.equal(true);
    // });
  });
});
