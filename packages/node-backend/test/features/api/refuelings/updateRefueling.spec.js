const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

const VALID_SAMPLE_REFUELING = require('./validSampleRefueling');

describe('API :: PUT /api/refuelings/:id', () => {
  context('when refueling exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated refueling', async () => {
        const refueling = await factory.create(
          'refueling',
          VALID_SAMPLE_REFUELING
        );

        const updatedRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
        updatedRefueling.price = 3.141;

        const { body } = await request()
          .put(`/api/refuelings/${refueling.id}`)
          .send(updatedRefueling)
          .expect(202);

        expect(body.id).to.equal(refueling.id);
        expect(body.name).to.equal('Updated refueling');
      });
    });

    context('when price is empty', () => {
      it('does update and returns 400 with the validation error', async () => {
        const refueling = await factory.create(
          'refueling',
          VALID_SAMPLE_REFUELING
        );

        const updatedRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
        updatedRefueling.price = '';

        const { body } = await request()
          .put(`/api/refuelings/${refueling.id}`)
          .send(updatedRefueling)
          .expect(400);

        expect(body.type).to.equal('ValidationError');
        expect(body.details).to.have.lengthOf(1);
        expect(body.details[0].message).to.equal(
          '"price" is not allowed to be empty'
        );
      });
    });
  });

  context('when refueling does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const updatedRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
      updatedRefueling.price = 3.141;

      const { body } = await request()
        .put('/api/refuelings/0')
        .send(updatedRefueling)
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal("refueling with id 0 can't be found.");
    });
  });
});
