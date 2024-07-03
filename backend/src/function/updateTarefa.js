const tarefaDB = require("../../models/tarefaDB.js");

const updateTarefa = async (contatoId, id, novosDados) => {
    try {
        await tarefaDB.update(novosDados, {
            where: {
                id: id,
                contatoId: contatoId
            }
        });
        return true;
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error.message);
        throw error;
    }
}

module.exports = updateTarefa