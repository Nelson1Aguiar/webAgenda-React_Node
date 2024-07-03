const contatoDB = require("../../models/contatoDB.js");


const deletarContato = async(id,idLogado) =>{
    try {
        const contatoDelete = await contatoDB.findOne({
            where: {
                id: id,
                usuarioId: idLogado
            }
        });
        await contatoDelete.destroy();
        return true;
    }catch(error){
        console.error('Erro ao deletar contato:', error.message);
        throw error;
    }
}

module.exports = deletarContato 