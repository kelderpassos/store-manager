const sinon = require("sinon");
const { expect } = require("chai");
const salesModels = require("../../../models/salesModels");
const salesServices = require("../../../services/salesServices");

describe('Get and manipulate products from database', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe('Return the new product', async () => {
    const mockBody = [
    {
      "productId": 1,
      "quantity":1
    },
    {
      "productId": 2,
      "quantity":5
    }
    ]
    
    const mockResponse = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    it('returns the new sales', async () => {
      sinon.stub(salesModels, 'checkIfExists').resolves(true);
      sinon.stub(salesModels, 'createSale').resolves(mockResponse);
      
      const response = await salesServices.createSales(mockBody);
      expect(response).to.have.keys('id', 'itemsSold');
      expect(response).to.be.equal(mockResponse);
    });
  });

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
    const mockBody = [
      {
        productId: 1,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 500,
      },
    ];

    const invalidMockBody = [
      {
        productId: 111,
        quantity: 100,
      },
      {
        productId: 2,
        quantity: 500,
      },
    ];

    const mockResponse = [
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

    const mockUpdatedResponse = {
      saleId: "1",
      itemsUpdated: [
        {
          productId: 1,
          quantity: 100,
        },
        {
          productId: 2,
          quantity: 500,
        },
      ],
    };

    it(`should return 'Sale not found'`, async () => {
      sinon.stub(salesModels, "getEverySale").resolves([]);
      const response = await salesServices.updateById(1, mockBody);
      expect(response).to.have.property("errorMessage");
      expect(response.errorMessage).to.be.equal("Sale not found");
    });

    it(`should return 'Product not found'`, async () => {
      sinon.stub(salesModels, "getEverySale").resolves(mockResponse);
      const response = await salesServices.updateById(1, invalidMockBody);
      expect(response).to.have.property('errorMessage');
    });

    it(`should return the updated sale`, async () => {
      sinon.stub(salesModels, 'getEverySale').resolves(mockResponse);
      sinon.stub(salesModels, "updateById").resolves(mockUpdatedResponse);
      const response = await salesServices.updateById(1, mockBody);
      
      expect(response).to.have.keys('saleId', 'itemsUpdated');
      expect(response.itemsUpdated).to.be.an("array");
      expect(response.itemsUpdated.length).to.be.above(0);
      expect(response).to.be.equal(mockUpdatedResponse);
    });
  });
});