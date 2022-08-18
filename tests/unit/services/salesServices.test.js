const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

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

    it('should return every product', async () => {
      sinon.stub(salesModels, 'getEverySale').resolves(mock);
      const response = await salesModels.getEverySale();
      expect(response).to.be.equal(mock)
    });
  });

  describe("Get every sale from database", () => { });
  
  describe("Get every sale from database", () => { });
  describe("Get every sale from database", () => {});
});