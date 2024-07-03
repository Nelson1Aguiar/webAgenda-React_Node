const contatoDB = require("../../models/contatoDB.js");
const { Op } = require("sequelize");

const buscarContato = async (termo, id) => {
    if (termo === "NadaDigitado") {
        try {
            const usuarios = await contatoDB.findAll({
                where: {
                    usuarioId: id
                }
            });
            return usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error.message);
        }
    }

    try {
        const resultSearch = await contatoDB.findAll({
            where: {
                [Op.and]: [
                    { usuarioId: id },
                    {
                        [Op.or]: [
                            { numero: { [Op.like]: `%${termo}%` } },
                            { nome: { [Op.like]: `%${termo}%` } }
                        ]
                    }
                ]
            }
        });
        return resultSearch
    }
    catch (error) {
        console.error('Erro ao buscar contato:', error.message);
        throw error;
    }
}

module.exports = buscarContato;