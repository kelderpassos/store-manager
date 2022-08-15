const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModels = require("../../../models/productsModels");

describe('Create new sales', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe('Create a new sale date', () => {
    const bodyMock = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const mockId = 4

    it('returns an object with the a new id', async () => {
      sinon.stub(connection, 'execute').resolves(mockId);
      const response = await salesModels.createSale(bodyMock)
    });
  });
});