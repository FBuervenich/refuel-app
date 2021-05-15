import { Router } from 'express';
import { inject } from 'awilix-express';
import Status from 'http-status';
import { RestController } from '../../types';

const RefuelingsController: RestController = {
  get router() {
    const router = Router();

    router.get('/', this.index);
    router.get('/:id', this.show);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);

    return router;
  },

  index: inject(
    ({ getAllRefuelings, refuelingSerializer }) => (req, res, next) => {
      const { SUCCESS, ERROR } = getAllRefuelings.outputs;

      getAllRefuelings
        .on(SUCCESS, refuelings => {
          res
            .status(Status.OK)
            .json(refuelings.map(refuelingSerializer.serialize));
        })
        .on(ERROR, next);

      const userId = res.callingUserId;
      getAllRefuelings.execute(userId);
    }
  ),

  show: inject(({ getRefueling, refuelingSerializer }) => (req, res, next) => {
    const { SUCCESS, ERROR, NOT_FOUND } = getRefueling.outputs;

    getRefueling
      .on(SUCCESS, refueling => {
        res.status(Status.OK).json(refuelingSerializer.serialize(refueling));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details,
        });
      })
      .on(ERROR, next);

    const userId = res.callingUserId;
    getRefueling.execute(Number(req.params.id), userId);
  }),

  create: inject(
    ({ createRefueling, refuelingSerializer }) => (req, res, next) => {
      const { SUCCESS, ERROR, VALIDATION_ERROR } = createRefueling.outputs;

      createRefueling
        .on(SUCCESS, refueling => {
          res
            .status(Status.CREATED)
            .json(refuelingSerializer.serialize(refueling));
        })
        .on(VALIDATION_ERROR, error => {
          res.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            details: error.details,
          });
        })
        .on(ERROR, next);

      const userId = res.callingUserId;
      createRefueling.execute(req.body, userId);
    }
  ),

  update: inject(
    ({ updateRefueling, refuelingSerializer }) => (req, res, next) => {
      const {
        SUCCESS,
        ERROR,
        VALIDATION_ERROR,
        NOT_FOUND,
      } = updateRefueling.outputs;

      updateRefueling
        .on(SUCCESS, refueling => {
          res
            .status(Status.ACCEPTED)
            .json(refuelingSerializer.serialize(refueling));
        })
        .on(VALIDATION_ERROR, error => {
          res.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            details: error.details,
          });
        })
        .on(NOT_FOUND, error => {
          res.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            details: error.details,
          });
        })
        .on(ERROR, next);

      updateRefueling.execute(Number(req.params.id), req.body);
    }
  ),

  delete: inject(({ deleteRefueling }) => (req, res, next) => {
    const { SUCCESS, ERROR, NOT_FOUND } = deleteRefueling.outputs;

    deleteRefueling
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details,
        });
      })
      .on(ERROR, next);

    deleteRefueling.execute(Number(req.params.id));
  }),
};

export default RefuelingsController;
