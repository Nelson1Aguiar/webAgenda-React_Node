const userDB = require("../../models/userDB.js");

const cadastrar = async (user) => {
    if (!user.nome || !user.senha || !user.email) {
        return 2; //Campos em branco
    }

    try {
        const userCheck = await userDB.findOne({
            where: {
                email: user.email,
            }
        });

        if (userCheck) {
            return 3; //userJaCadastrado
        }
        else {
            userDB.create({
                nome: user.nome,
                email: user.email,
                senha: user.senha,
            })
            return 1;
        }
    }
    catch (error) {
        console.error('Erro ao verificar ao cadastrar:', error.message);
        throw error;
    }
}

module.exports = cadastrar;