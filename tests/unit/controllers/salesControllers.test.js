const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require("../../../services/salesServices");
const salesControllers = require("../../../controllers/salesControllers");

describe('Test every function from salesControllers', () => {
  const req = {};
  const res = {};
  const PRODUCT_NOT_FOUND = "Product not found";
  const SALE_NOT_FOUND = "Sale not found";

  beforeEach(() => {
    sinon.restore();
  })

  describe('Get every product from database', () => {
    it('returns an error message', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "getEverySale")
        .resolves({ code: 404, message: "Sale not found" });
      await salesControllers.getEverySale(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('returns every sale from database', async () => {
      const mock = [
        {
          saleId: 1,
          date: "2022-08-18T22:14:57.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: "2022-08-18T22:14:57.000Z",
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: "2022-08-18T22:14:57.000Z",
          productId: 3,
          quantity: 15,
        },
      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getEverySale').resolves(mock);
      await salesControllers.getEverySale(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });

  describe('Get products by an specific id', () => {
    const mockById = [
      {
        date: "2022-08-18T14:56:32.000Z",
        productId: 3,
        quantity: 15,
      },
    ];

    it(`returns an error message`, async () => {
      req.params = { id: 99 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "findById").resolves([]);

      await salesControllers.findById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('returns a sale by its id', async () => {
      req.params = { id: 2 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'findById').resolves(mockById);

      await salesControllers.findById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockById)).to.be.equal(true);
    });
  });

  describe("Delete products from database", () => {
    it(`returns an error message`, async () => {
      req.params = { id: 99 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'deleteById').resolves(false);

      await salesControllers.deleteById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: SALE_NOT_FOUND })).to.be.true;
    });

    it("", async () => { });
    
  });

  // describe("", () => {
  //   it("", async () => { });
  //   it("", async () => { });
  //   it("", async () => { });
  //   it("", async () => {});
  // });

});