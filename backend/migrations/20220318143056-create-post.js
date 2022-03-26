'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      userName:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:''
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:''
      },
      messages: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};