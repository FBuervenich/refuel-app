const request = require('test/support/request');
const { expect } = require('chai');

const VALID_SAMPLE_REFUELING = require('./validSampleRefueling');

describe('API :: POST /api/refuelings', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new refueling', async () => {
      const { body } = await request()
        .post('/api/refuelings')
        .send(VALID_SAMPLE_REFUELING)
        .expect(201);

      expect(body.id).to.exist;
      expect(body.name).to.equal('New Refueling');
      expect(body).to.have.all.keys(
        'id',
        'litres',
        'price',
        'pricePerLitre',
        'fullTank'
      );
    });
  });

  context('when litres is missing', () => {
    const invalidRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
    delete invalidRefueling.litres;

    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/refuelings')
        .send()
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"litres" is required');
    });
  });

  context('when price is missing', () => {
    const invalidRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
    delete invalidRefueling.price;

    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request().post('/api/refuelings').expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"price" is required');
    });
  });

  context('when pricePerLitre is missing', () => {
    const invalidRefueling = Object.assign({}, VALID_SAMPLE_REFUELING);
    delete invalidRefueling.pricePerLitre;

    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request().post('/api/refuelings').expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"pricePerLitre" is required');
    });
  });
});
