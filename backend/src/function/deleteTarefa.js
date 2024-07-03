const tarefaDB = require("../../models/tarefaDB.js");

const deletarTarefa = async(numero,id) =>{
    try {
        const tarefaDelete = await tarefaDB.findOne({
            where: {
                id: id,
                contatoId: numero
            }
        });
        await tarefaDelete.destroy();
        return true;
    }catch(error){
        console.error('Erro ao deletar tarefa:', error.message);
        throw error;
    }
}

module.exports = deletarTarefa