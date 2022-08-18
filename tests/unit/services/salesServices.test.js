const sinon = require("sinon");
const { expect } = require("chai");
const salesModels = require("../../../models/salesModels");
const salesServices = require("../../../services/salesServices");
const { deleteById } = require("../../../models/salesModels");

describe('Get and manipulate products from database', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  // describe('Return the new product', async () => {
  //   it('returns the new sales', async () => {
  //     sinon.stub(salesModels, 'checkIfExists').
  //   });
  // });

  describe('Get every sale from database', () => {
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

    it('should return an error message', async () => {
      sinon.stub(salesModels, 'getEverySale').resolves(null);
      const response = await salesServices.getEverySale();
      expect(response).to.have.keys('code', 'message');
      expect(response.code).to.be.equal(404);
      expect(response.message).to.be.equal('Sale not found');
    });

    it('should return every product', async () => {
      sinon.stub(salesModels, 'getEverySale').resolves(mock);
      const response = await salesServices.getEverySale();
      expect(response).to.be.equal(mock);
    });
  });

  describe("Get an specific sale from database", () => {
    const mock = [
      {
        date: "2022-08-18T14:56:32.000Z",
        productId: 3,
        quantity: 15,
      },
    ];

    it('should return an specific sale', async () => {
      sinon.stub(salesModels, 'findById').resolves(mock);
      const response = await salesServices.findById(2);
      expect(response[0]).to.have.keys('date', 'productId', 'quantity');
      expect(response).to.be.eql(mock);
    });
  });
  
  describe("Delete a sale from database", () => {
    it(`should return 'null'`, async () => {
      sinon.stub(salesModels, 'deleteById').resolves(false);
      const response = await salesServices.deleteById(99);
      expect(response).to.be.equal(null);
    });

    it("should return true", async () => {
      sinon.stub(salesModels, 'deleteById').resolves(true);
      const response = await salesServices.deleteById(1);
      expect(response).to.be.equal(true);
    });
  });

  describe("Update a sale in the database", () => {
    const mock = [
      {
        productId: 1,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 500,
      },
    ];

    it(`should return 'Sale not found'`, async () => {
      sinon.stub(salesModels, "getEverySale").resolves([]);
      const response = await salesServices.updateById(1, mock);
      expect(response).to.have.key("errorMessage");
      expect(response.errorMessage).to.be.equal("Sale not found");
    });

    it(`should return 'Product not found'`, async () => {

    });

    it(`should return null if the update doesn't happen`, async () => {

    });
  });
});