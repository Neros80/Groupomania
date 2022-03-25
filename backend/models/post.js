'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
        title: DataTypes.STRING,
        messages: DataTypes.STRING,
        comment: DataTypes.STRING
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

