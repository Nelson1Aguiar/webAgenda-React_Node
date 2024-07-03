const userDB = require("../../models/userDB.js");

const logar = async (user) => {
    if (!user.email || !user.senha) {
        return false; //campos nao preenchidos
    }
    try {
        const userCheck = await userDB.findOne({
            where: {
                email: user.email,
                senha: user.senha
            }
        });
        if (userCheck) {
            return userCheck.id //sucesso
        }
        else {
            return false // credenciais invalidas
        }
    }catch(error){
        console.error('Erro ao logar:', error.message);
        throw error;
    }
}

module.exports = logar;