const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Get and manipulate sales from database', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  describe("Create a new sale date", () => {
    const mockNewSale = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const mockReturn = {
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

    const ResultSetHeader = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };

    it("returns an sale with the an id", async () => {
      sinon.stub(connection, "execute").resolves([ResultSetHeader]);
      const response = await salesModels.createSale(mockNewSale);
      expect(response).to.have.property("id");
      expect(response).to.have.property("itemsSold");
      expect(response.itemsSold).to.be.an('array');
      expect(response.itemsSold).to.be.eql(mockReturn.itemsSold);
    });
  });

  describe("Get every sold product ", () => {
    it("returns every sold product from database", async () => {
      const mock = [
        {
          saleId: 1,
          date: "2022-08-18T14:15:01.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: "2022-08-18T14:15:01.000Z",
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: "2022-08-18T14:15:01.000Z",
          productId: 3,
          quantity: 15,
        },
      ];

      sinon.stub(connection, "execute").resolves([mock]);

      const response = await salesModels.getEverySale();
      expect(response[0]).to.have.property("saleId");
      expect(response[0]).to.have.property("date");
      expect(response[0]).to.have.property("productId");
      expect(response[0]).to.have.property("quantity");
      expect(response).to.be.eql(mock);
    });
  });

  describe('Get sales from database by its id', () => {
    it('returns a product by its id', async () => {
      const mock = [
        {
          date: "2022-08-18T14:56:32.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-08-18T14:56:32.000Z",
          productId: 2,
          quantity: 10,
        },
      ];

      sinon.stub(connection, 'execute').resolves([mock]);
      const response = await salesModels.findById(1);
      expect(response[0]).to.have.property("date");
      expect(response[0]).to.have.property("productId");
      expect(response[0]).to.have.property("quantity");
      expect(response).to.be.eql(mock)
    });
  });

  describe('Delete a sale from database', () => {
    it('deletes a sale successfully', async () => {
      const ResultSetHeader = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }

      const deletedSale = ResultSetHeader.affectedRows;
      sinon.stub(connection, 'execute').resolves([deletedSale]);
      const response = await salesModels.deleteById(1);
      expect(response).to.be.equal(false);
    });
  });

  describe('Update a sale in the database', () => {
    it('updates a sale with new information received', async () => {
      const mockUpdateById = {
        saleId: 1,
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

      const mockNewInfo = [
        {
          productId: 1,
          quantity: 100
        },
        {
          productId: 2,
          quantity: 500
        }
      ];

      const mockConnection = [
        {
          saleId: 1,
          date: '2022 - 08 - 18T17: 59: 08.000Z',
          productId: 1,
          quantity: 100
        },
        {
          saleId: 1,
          date: '2022 - 08 - 18T17: 59: 08.000Z',
          productId: 2,
          quantity: 500
        },
        {
          saleId: 2,
          date: '2022 - 08 - 18T17: 59: 08.000Z',
          productId: 3,
          quantity: 15
        }
      ];

      sinon.stub(connection, 'execute').resolves(mockConnection);
      const response = await salesModels.updateById(1, mockNewInfo);
      expect(response).to.be.eql(mockUpdateById);
    });
  });

  describe("Check if an id exists", () => {
    it("should return an empty array", async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      await expect(salesModels.checkIfExists(99))
        .to.be.rejectedWith("Product not found");
    });
  });

  

});