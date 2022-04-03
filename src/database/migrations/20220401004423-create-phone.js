'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('phone', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isWhatsapp: {
          type: Sequelize.BOOLEAN
        },
        personId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }, {transaction: t})
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('phone', {transaction: t})
    })
  }
};
