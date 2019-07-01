'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    name: DataTypes.STRING,
    tagLine: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  city.associate = function(models) {
    // associations can be defined here
   models.city.belongsTo(models.user)
    models.city.hasMany(models.location)

  };
  return city;
};