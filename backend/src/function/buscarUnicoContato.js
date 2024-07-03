const contatoDB = require("../../models/contatoDB.js");

const buscarUnicoContato = async (idLogado, id) => {
    try {
        const resultSearch = await contatoDB.findOne({
            where: {
                id: id,
                usuarioId: idLogado
            }
        });
        return resultSearch
    }
    catch (error) {
        console.error('Erro ao buscar contato:', error.message);
        throw error;
    }
}

module.exports = buscarUnicoContato;