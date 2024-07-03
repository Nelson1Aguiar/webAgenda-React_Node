const Sequelize = require("sequelize");
const sequelize = require("./conect");

const Mensagem = sequelize.define('mensagens', {
    emissor: {
        type: Sequelize.INTEGER,
        references: {
            model: 'contatos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    receptor: {
        type: Sequelize.INTEGER,
        references: {
            model: 'contatos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    conteudo: {
        type: Sequelize.TEXT
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

//Mensagem.sync({force: true})

module.exports = Mensagem;