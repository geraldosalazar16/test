const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const modelAttributes = {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(50)
        },
        last_name: {
            type: DataTypes.STRING(50)
        },
        birthday: {
            type: DataTypes.DATE
        },
        password: DataTypes.STRING(40)
    };
    return sequelize.define('user', modelAttributes)
}