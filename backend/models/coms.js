'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coms = sequelize.define('Coms', {
        coms: DataTypes.STRING,
        PostId: DataTypes.INTEGER,
        userName: DataTypes.STRING
  }, {classMethods: {
    associate: function(models) {

      models.Coms.belongsTo(models.Post)
    }
  }
});
return Coms
};