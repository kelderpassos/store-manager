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
      expect(res.status.calledWith(mock)).to.be.equal(true);
    });
  });

});