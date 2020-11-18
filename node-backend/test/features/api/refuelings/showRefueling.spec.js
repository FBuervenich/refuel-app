const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

const VALID_SAMPLE_REFUELING = require('./validSampleRefueling');

describe('API :: GET /api/refuelings/:id', () => {
  context('when refueling exists', () => {
    it('returns the refueling and status 200', async () => {
      const refueling = await factory.create(
        'refueling',
        VALID_SAMPLE_REFUELING
      );

      const { body } = await request()
        .get(`/api/refuelings/${refueling.id}`)
        .expect(200);

      expect(body.id).to.equal(refueling.id);
      expect(body.price).to.equal(VALID_SAMPLE_REFUELING.price);
    });
  });

  context('when refueling does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request().get('/api/refuelings/0').expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal("Refueling with id 0 can't be found.");
    });
  });
});
