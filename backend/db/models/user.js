'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.hasMany(
        models.Location,
        {foreignKey: 'ownerId', onDelete: 'CASCADE'}
      );
      User.hasMany(
        models.Review,
        {foreignKey: 'userId', onDelete: 'CASCADE'}
      );

    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 25]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 25]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
