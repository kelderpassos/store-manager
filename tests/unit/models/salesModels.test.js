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

  // describe('Delete a sale from database', () => {
  //   it('deletes a sale successfully', async () => {
  //     const deletedSale = 
  //   });
  // });

  describe("Check if an id exists", () => {
    it("should return an empty array", async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      await expect(salesModels.checkIfExists(99))
        .to.be.rejectedWith("Product not found");
    });
  });

});