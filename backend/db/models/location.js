'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(
        models.Review,
        {foreignKey: 'locationId', onDelete: 'CASCADE'}
      ),
      Location.belongsTo(
        models.User,
        {foreignKey: 'ownerId', onDelete: 'CASCADE'}
      ),
      Location.hasMany(
        models.LocationImage,
        {foreignKey: 'locationId', onDelete: 'CASCADE'}
      )
    }
  }
  Location.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
