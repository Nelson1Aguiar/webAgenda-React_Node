const tarefaDB = require("../../models/tarefaDB.js");
const contatoDB = require("../../models/contatoDB.js");

const buscarTarefa = async (id) => {
    try {
        const tarefas = await tarefaDB.findAll();
        const contatos = await contatoDB.findAll();

        const contatosDoUsuario = contatos.filter(contato => contato.usuarioId == id);

        const tarefasFiltradas = tarefas.filter(tarefa => 
            contatosDoUsuario.some(contato => contato.id == tarefa.contatoId)
        );
        
        return tarefasFiltradas;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error.message);
        throw error;
    }
}
module.exports = buscarTarefa;