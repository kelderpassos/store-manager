const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require("../../../services/salesServices");
const salesControllers = require("../../../controllers/salesControllers");

describe('Test every function from salesControllers', () => {
  const req = {};
  const res = {};
  const PRODUCT_NOT_FOUND = "Product not found";
  const SALE_NOT_FOUND = "Sale not found";

  describe('Get every product from database', () => {
    it('returns an error message', async () => {
      res.status = sinon.stub().resolves(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "getEverySale")
        .resolves({ code: 404, message: "Sale not found" });
      await salesControllers.getEverySale(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  })
});