'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: DataTypes.STRING,
    headlineText: DataTypes.STRING,
    coordinates: DataTypes.TEXT,
    headlineUrl: DataTypes.TEXT,
    cityId: DataTypes.INTEGER
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};