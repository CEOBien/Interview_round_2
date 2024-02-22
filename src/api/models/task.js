"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Tasks.init(
    {
      name_task: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_task: {
        type: DataTypes.ENUM,
        values: [
            'resolve',
            'reject',
            'pending'
        ],
        defaultValue: 'pending'
    },
      CD: DataTypes.STRING,
      CREATED_DATE: DataTypes.DATE,
      CREATED_BY: DataTypes.INTEGER,
      MODIFIED_DATE: DataTypes.DATE,
      MODIFIED_BY: DataTypes.INTEGER,
      IS_DELETED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Tasks",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  )
  return Tasks
}
