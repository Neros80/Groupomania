'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coms = sequelize.define('Coms', {
        coms: DataTypes.STRING,
        messageId: DataTypes.INTEGER,
  }, {classMethods: {
    associate: function(models) {

      models.Coms.belongsTo(models.Coms,{
        foreinKey: {
          allowNull: false
        }
      })
    }
  }
});
return Coms
};