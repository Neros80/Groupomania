'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
        userId: DataTypes.INTEGER,
        userName: DataTypes.STRING,
        title: DataTypes.STRING,
        messages: DataTypes.STRING,
  }, {classMethods: {
    associate: function(models) {

      models.Post.belongsTo(models.User,{
        foreinKey: {
          allowNull: false
        }
      })
    },
    associate: function(models) {
      models.Post.hasMany(models.Coms)
    }
  }
});
return Post
};

