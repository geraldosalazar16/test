const { Sequelize } = require('sequelize');
const userFactory = require('./models/user');
const genderFactory = require('./models/gender');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const userModel = userFactory(sequelize);
const genderModel = genderFactory(sequelize);
genderModel.hasOne(userModel, {
    foreignKey: 'gender_id'
});

module.exports = {
    sequelize,
    User: userModel,
    Gender: genderModel
}