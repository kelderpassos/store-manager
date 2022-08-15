const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Create new sales', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe('Check if an id exists', () => {
    it('should return an empty array', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      await expect(salesModels.checkIfExists(99)).to.be.rejectedWith("Product not found");
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