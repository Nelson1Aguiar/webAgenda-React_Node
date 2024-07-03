const Sequelize = require("sequelize");
const sequelize = require("./conect");

const User = sequelize.define('usuario', {
    nome: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

//User.sync({force: true})
module.exports = User;