const RefuelingMapper = require('./SequelizeRefuelingMapper');

class SequelizeRefuelingsRepository {
  constructor({ RefuelingModel }) {
    this.RefuelingModel = RefuelingModel;
  }

  async getAll(...args) {
    const refuelings = await this.RefuelingModel.findAll(...args);

    return refuelings.map(RefuelingMapper.toEntity);
  }

  async getById(id) {
    const refueling = await this._getById(id);

    return RefuelingMapper.toEntity(refueling);
  }

  async add(refueling) {
    const { valid, errors } = refueling.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newRefueling = await this.RefuelingModel.create(
      RefuelingMapper.toDatabase(newRefueling)
    );
    return RefuelingMapper.toEntity(newRefueling);
  }

  async remove(id) {
    const refueling = await this._getById(id);

    await refueling.destroy();
    return;
  }

  async update(id, newData) {
    const refueling = await this._getById(id);

    const transaction = await this.RefuelingModel.sequelize.transaction();

    try {
      const updatedRefueling = await refueling.update(newData, { transaction });
      const refuelingEntity = RefuelingMapper.toEntity(updatedRefueling);

      const { valid, errors } = refuelingEntity.validate();

      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return refuelingEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.RefuelingModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.RefuelingModel.findByPk(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Refueling with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeRefuelingsRepository;
