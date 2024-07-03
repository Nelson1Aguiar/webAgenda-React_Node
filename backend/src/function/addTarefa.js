const tarefaDB = require("../../models/tarefaDB.js");

const criarTarefa = async (tarefa) => {
    if (!tarefa.nome) {
        return false;
    }
    try {
        tarefaDB.create({
            nome: tarefa.nome,
            data: tarefa.data,
            descricao: tarefa.descricao,
            contatoId: tarefa.id_Contato
        })
        return true;
    }
    catch (error) {
        console.error('Erro ao criar contato:', error.message);
        throw error;
    }
}

module.exports = criarTarefa;