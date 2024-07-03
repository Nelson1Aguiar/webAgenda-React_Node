const contatoDB = require("../../models/contatoDB.js");

const criarContato = async (contato) => {
    if (!contato.nome || !contato.numero) {
        return 2; //campos em branco
    }

    try {
        const cttCheck = await contatoDB.findOne({
            where: {
                numero: contato.numero,
                usuarioId: contato.id_User
            }
        });

        if (cttCheck) {
            return 3; //numero ja cadastrado
        }

        else {
            contatoDB.create({
                nome: contato.nome,
                email: contato.email,
                numero: contato.numero,
                usuarioId: contato.id_User
            })
            return 1;
        }
    }
    catch (error) {
        console.error('Erro ao criar contato:', error.message);
        throw error;
    }
}

module.exports = criarContato;