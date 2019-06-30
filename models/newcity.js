'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    name: DataTypes.STRING,
    tagLine: DataTypes.STRING
  }, {});
  city.associate = function(models) {
    // associations can be defined here
    models.city.hasMany(models.location);
  };
  return city;
};