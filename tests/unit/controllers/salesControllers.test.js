const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require("../../../services/salesServices");
const salesControllers = require("../../../controllers/salesControllers");

describe("Test every function from salesControllers", () => {
  const req = {};
  const res = {};
  const PRODUCT_NOT_FOUND = "Product not found";
  const SALE_NOT_FOUND = "Sale not found";

  beforeEach(() => {
    sinon.restore();
  });

  describe('Create a new sale', () => {
    const existentProduct = [
      {
        productId: 1,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 500,
      },
    ];

    const newSale = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    it('returns the created sale', async () => {
      req.body = existentProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'createSales').resolves(newSale);

      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(newSale)).to.be.true;
    });
  });

  describe("Get every sale from database", () => {
    it("returns an error message", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "getEverySale")
        .resolves({ code: 404, message: "Sale not found" });
      await salesControllers.getEverySale(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it("returns every sale from database", async () => {
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
      sinon.stub(salesServices, "getEverySale").resolves(mock);
      await salesControllers.getEverySale(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });

  describe("Get sales by an specific id", () => {
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

    it("returns a sale by its id", async () => {
      req.params = { id: 2 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "findById").resolves(mockById);

      await salesControllers.findById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockById)).to.be.equal(true);
    });
  });

  describe("Delete sales from database", () => {
    it(`returns an error message`, async () => {
      req.params = { id: 99 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "deleteById").resolves(false);

      await salesControllers.deleteById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: SALE_NOT_FOUND })).to.be.true;
    });

    it("deletes the sale", async () => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesServices, "deleteById").resolves(true);

      await salesControllers.deleteById(req, res);
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledWith()).to.be.true;
    });
  });

  describe("Update a sale by its id ", () => {
    const existentProduct = [
      {
        productId: 1,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 500,
      },
    ];

    const unexistentProduct = [
      {
        productId: 111,
        quantity: 100,
      },
      {
        productId: 222,
        quantity: 500,
      },
    ];

    const updatedSale = {
      saleId: "1",
      itemsUpdated: [
        { productId: 1, quantity: 100 },
        { productId: 2, quantity: 500 },
      ],
    };

    it(`returns the error message ${SALE_NOT_FOUND}`, async () => {
      req.params = { id: 99 };
      req.body = existentProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "updateById")
        .resolves({ errorMessage: SALE_NOT_FOUND });

      await salesControllers.updateById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: SALE_NOT_FOUND })).to.be.true;
    });

    it(`returns the error message ${PRODUCT_NOT_FOUND}`, async () => {
      req.params = { id: 1 };
      req.body = unexistentProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "updateById").resolves({ errorMessage: PRODUCT_NOT_FOUND });
      
      await salesControllers.updateById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: PRODUCT_NOT_FOUND })).to.be.true;
    });

    it("returns the updated product", async () => {
      req.params = { id: 1 };
      req.body = existentProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updateById').resolves(updatedSale);

      await salesControllers.updateById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedSale)).to.be.true;
    });
  });
});
