const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

describe('Send the correct responses', () => {
  const req = {};
  const res = {};
  const errorMessage = { message: "Product not found" };
 
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
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(mock);

      await productsControllers.getAll(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('returns the correct response status', async () => {
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
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves(mock);

      await productsControllers.findById(req, res);
    
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('returns the message: "Product not found"', async () => {
      req.params = { id: 1 };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves(undefined);

      await productsControllers.findById(req, res);

      expect(res.json.calledWith(errorMessage)).to.be.equal(true);
    });

  });

  describe('Create a new product', () => {
    const mock = { id: 1, name: 'Fuzil do Justiceiro' }; 

    it('returns the created product with an id', async () => {
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

    it("returns the product updated with the new info", async () => {      
      req.body = { name: "Fuzil do Capitão América" };
      req.params = 3;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "updateProduct").resolves(mock);

      await productsControllers.updateProduct(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it("returns an error message", async () => {
      req.body = { name: "Fuzil do Capitão América" };
      req.params = 99;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "updateProduct").resolves(errorMessage);

      await productsControllers.updateProduct(req, res);
      expect(res.json.calledWith(errorMessage)).to.be.equal(true);
    });
  });

  describe('Delete a product from database', () => {
    it('should return an error message', async () => {
      req.params = 99;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, "deleteById").resolves(errorMessage);
      
      await productsControllers.deleteById(req, res);
      expect(res.json.calledWith(errorMessage)).to.be.equal(true);
    });

    it('should delete a product from database', async () => {
      const ResultSetHeader = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }

      const productDeleted = ResultSetHeader.affectedRows;      
      req.params = 99;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(productsServices, "deleteById").resolves([productDeleted]);

      await productsControllers.deleteById(req, res);
      expect(res.end.calledWith()).to.be.equal(true);
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

    it("should return every product with the term searched", async () => {
      const req = { query: { q: 'me' }};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'searchByTerm').resolves(mock);

      await productsControllers.searchByTerm(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });
});
