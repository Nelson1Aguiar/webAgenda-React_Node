const Sequelize = require("sequelize");
const sequelize = require("./conect");


const Contato = sequelize.define('contato', {
    nome: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING
    },
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})

//Contato.sync({force: true})

module.exports = Contato;