const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: DELETE /api/refuelings/:id', () => {
  context('when refueling exists', () => {
    it('deletes the refueling and returns status 202', async () => {
      const refueling = await factory.create('refueling', {
        id: 1,
      });

      await request().delete(`/api/refuelings/${refueling.id}`).expect(202);
    });
  });

  context('when refueling does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/refuelings/0')
        .send({
          id: 'Updated Refueling',
        })
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal("Refueling with id 0 can't be found.");
    });
  });
});
