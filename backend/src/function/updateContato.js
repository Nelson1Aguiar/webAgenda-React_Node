const contatoDB = require("../../models/contatoDB.js");

const updateContato = async (numeroAntigo, id, novosDados) => {
    if(!novosDados.nome){
        return false;
    }
    try {
        if (novosDados.numero !== numeroAntigo) {
            const contatoCheck = await contatoDB.findOne({
                where: {
                    numero: novosDados.numero,
                    usuarioId: id
                }
            });
            if (contatoCheck) {
                return false; //numero novo igual a um numero ja cadastrado
            }
            else {
                await contatoDB.update(novosDados, {
                    where: {
                        numero: numeroAntigo,
                        usuarioId: id
                    }
                });
                return true;
            }
        }
        else {
            await contatoDB.update(novosDados, {
                where: {
                    numero: numeroAntigo,
                    usuarioId: id
                }
            });
            return true;
        }
    } catch (error) {
        console.error('Erro ao atualizar contato:', error.message);
        throw error;
    }
}

module.exports = updateContato