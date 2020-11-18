const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

const VALID_SAMPLE_REFUELING = require('./validSampleRefueling');

describe('API :: GET /api/refuelings', () => {
  context('when there are refuelings', () => {
    beforeEach(() => {
      let sampleRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
      delete sampleRefueling.litres;

      return factory.createMany('refueling', 2, [
        {
          litres: 10,
          ...sampleRefueling,
        },
        {
          litres: 20,
          ...sampleRefueling,
        },
      ]);
    });

    it('returns success with array of refuelings', async () => {
      const { body } = await request().get('/api/refuelings').expect(200);

      expect(body).to.have.lengthOf(2);

      expect(body[0].litres).to.equal(10);
      expect(body[0]).to.have.all.keys(
        'id',
        'litres',
        'price',
        'pricePerLitre',
        'fullTank'
      );
      expect(body[1].litres).to.equal(10);
      expect(body[1]).to.have.all.keys(
        'id',
        'litres',
        'price',
        'pricePerLitre',
        'fullTank'
      );
    });
  });

  context('when there are no refuelings', () => {
    it('returns success with empty array', async () => {
      const { body } = await request().get('/api/refuelings').expect(200);

      expect(body).to.have.lengthOf(0);
    });
  });
});
