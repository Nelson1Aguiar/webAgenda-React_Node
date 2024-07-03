const Sequelize = require("sequelize");
const sequelize = new Sequelize("agenda","root","suaSenhaAqui",{
    host: "localhost",
    dialect: "mysql"
});
sequelize.authenticate().then(function(){
    console.log("Conectado");
}).catch(function(error){
    console.log("Falha ao se conectar erro: "+error.message);
})


module.exports = sequelize;
