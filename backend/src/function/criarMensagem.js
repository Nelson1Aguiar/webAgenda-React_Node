const mensagemDB = require("../../models/mensagemDB.js");

const criarContato = async (mensagem) => {
    if (!mensagem.conteudo) {
        return 2; //campos em branco
    }

    try {
        mensagemDB.create({
            emissor: mensagem.emissor,
            receptor: mensagem.receptor,
            conteudo: mensagem.conteudo,
        })
        return 1;
    }
    catch (error) {
        console.error('Erro ao criar contato:', error.message);
        throw error;
    }
}

module.exports = criarContato;