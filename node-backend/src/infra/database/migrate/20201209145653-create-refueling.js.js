'use strict';

/**
 * In this version, the new column {madeAt} was added.
 * That column should have allowNull = false
 * which leads to this three-way-process:
 * 1. Create the column with allowNull = true
 * 2. Set a value for all existing rows
 * 3. Update the column, set allowNull = false
 */

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface
        .addColumn('refuelings', 'madeAt', {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        })
        .then(function () {
          console.log('created column madeAt');
          queryInterface.sequelize.query(
            'UPDATE refuelings SET "madeAt" = :current_date',
            {
              replacements: { current_date: new Date() },
              type: Sequelize.QueryTypes.UPDATE,
            }
          );
        })
        .then(function () {
          queryInterface.changeColumn('refuelings', 'madeAt', {
            type: Sequelize.DATE,
            allowNull: false,
          });
        })
        .catch((error) => {
          console.log(error);
        }),
    ]);
  },
  down: function (queryInterface) {
    return Promise.all([queryInterface.removeColumn('refuelings', 'madeAt')]);
  },
};
