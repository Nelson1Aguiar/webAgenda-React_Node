const Sequelize = require("sequelize");
const sequelize = require("./conect");

const Tarefa = sequelize.define('tarefa', {
    nome: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.DATE,
    },
    descricao: {
        type: Sequelize.TEXT
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contatoId: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'contatos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})

//Tarefa.sync({force: true})

module.exports = Tarefa;