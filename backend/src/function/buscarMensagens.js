const mensagemDB = require("../../models/mensagemDB.js");
const contatoDB = require("../../models/contatoDB.js");

const buscarMensagens = async (id) => {
    try {
        const mensagens = await mensagemDB.findAll();
        const contatos = await contatoDB.findAll();

        const contatosDoUsuario = contatos.filter(contato => contato.usuarioId == id);

        const mensagensFiltradas = mensagens.filter(mensagem => 
            contatosDoUsuario.some(contato => contato.id == mensagem.emissor)
        );
        
        return mensagensFiltradas;

    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
    }
}

module.exports = buscarMensagens;