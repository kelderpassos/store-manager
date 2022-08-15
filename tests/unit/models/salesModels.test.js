const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

describe('Create new sales', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe('Check if an id exists', () => {
    it('should return an empty array', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const response = await salesModels.checkIfExists(99);
      console.log(response);
      expect(response.length).to.be.equal(0);
    });
  });

  // describe('Create a new sale date', () => {
  //   const bodyMock = [
  //     {
  //       productId: 1,
  //       quantity: 1,
  //     },
  //     {
  //       productId: 2,
  //       quantity: 5,
  //     },
  //   ];

  //   it('returns an object with the a new id', async () => {
  //     sinon.stub(connection, 'execute').resolves(4);
  //     const response = await salesModels.createSale(bodyMock);
  //   });
  // });
});