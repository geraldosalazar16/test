const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const modelAttributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50)
        }
    };
    return sequelize.define('gender', modelAttributes)
}