const express = require("express")
const routes = express.Router()
const Pessoa = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\Class\\usuario.js")
const Contato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\Class\\contato.js")
const Tarefa = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\Class\\tarefa.js")
const Mensagem = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\Class\\mensagem.js")
const cadastrar = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\cadastre.js")
const login = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\login.js")
const criarContato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\criarContato.js")
const buscarContato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\buscarContato.js")
const deleteContato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\deleteContato.js")
const updateContato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\updateContato.js")
const criarTarefa= require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\addTarefa.js")
const buscarTarefa = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\buscarTarefas.js")
const deleteTarefa = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\deleteTarefa.js")
const updateTarefa = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\updateTarefa.js")
const criarMensagem = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\criarMensagem.js")
const buscarMensagens = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\buscarMensagens.js")
const buscarUnicoContato = require("C:\\Users\\User\\Desktop\\Programação\\Web\\agenda-web\\backend\\src\\function\\buscarUnicoContato.js")

routes.post("/cadastro", async (req, res) => {
    const { nomeValue, emailValue, senhaValue } = req.body;
    const user = new Pessoa (nomeValue,emailValue,senhaValue);
    try {
        const check = await cadastrar(user); 

        if (check === 2) {
            return res.status(401).json({ message: "Todos os campos devem ser preenchidos" });
        } else if (check === 3) {
            return res.status(402).json({ message: "E-mail já cadastrado" });
        }

        return res.status(200).json({ message: "Usuário cadastrado com sucesso" });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        return res.status(500).json({ message: "Erro interno ao cadastrar usuário" });
    }

})

routes.post("/login", async (req, res) => {
    const {emailValue, senhaValue} = req.body;
    const user = new Pessoa ("",emailValue,senhaValue);

    try{
        const checkLogin = await login(user);

        if(checkLogin === false){
            return res.status(401).json({ success: false, message: "E-mail e/ou senha incorretos" });
        }
        else{
            return res.status(200).json(checkLogin);
        }
    } catch(error){
        console.error('Erro ao logar:', error.message);
        return res.status(500).json({ message: "Erro interno ao logar" });
    }
})

routes.post("/criarContato", async(req, res) =>{
    const {nomeCtt, numCtt, email, idLogado} = req.body;

    const contato = new Contato (nomeCtt,numCtt,email,idLogado)
    try{
        const checkContato = await criarContato(contato)

        if(checkContato === 2){
            return res.status(401).json({message: "Campos em branco"});
        }

        else if(checkContato === 3){
            return res.status(402).json({message: "Contato já cadastrado"});
        }

        else{
            return res.status(200).json({message: "Contato salvo"});
        }
    }
    catch (error){
        console.error('Erro ao criar contato:', error.message);
        return res.status(500).json({ message: "Erro interno ao criar contato" });
    }
})

routes.get("/buscarContato/:termo", async(req,res) =>{
    const {termo} = req.params;
    const idLogado = req.headers['id-logado'];

    try{
        const checkBuscarCtt = await buscarContato(termo,idLogado);
        return res.status(200).json(checkBuscarCtt);
    }
    catch(error){
        console.error('Erro ao buscar contato:', error.message);
        return res.status(500).json({ message: "Erro interno ao buscar contato" });
    }
    
})
routes.put("/updateContato", async(req,res) =>{
    const {numeroAntigo, idLogado, numCtt, nomeCtt, email} = req.body;

    const novosDados = {
        nome: nomeCtt,
        numero: numCtt,
        email: email
    }

    try{
        const attContato = await updateContato(numeroAntigo,idLogado,novosDados);
        if(attContato){
            return res.status(200).json(attContato);
        }
        else{
            return res.status(401).json({message: "Número já pertence a outro contato ou nome está em branco"});
        }
    }
    catch(error){
        console.error('Erro ao atualizar contato:', error.message);
        return res.status(500).json({ message: "Erro interno ao atualizar contato" });

}})

routes.delete("/deleteContato/:id", async(req,res) =>{
    const {id} = req.params;
    const idLogado = req.headers['id-logado'];
    try{
        const deletar = await deleteContato(id, idLogado);
        if(deletar){
            res.status(200).json({message: "Contato deletado"})
        }
    }catch(error){
        console.error('Erro ao deletar contato:', error.message);
        return res.status(500).json({ message: "Erro interno ao deletar contato" });
    }
})

routes.get("/buscarTarefas", async(req,res) =>{
    const idLogado = req.headers['id-logado'];
    try{
        const buscar = await buscarTarefa(idLogado);
        if(buscar){
            res.status(200).json(buscar)
        }
    }catch(error){
        console.error('Erro ao buscar Tarefas:', error.message);
        return res.status(500).json({ message: "Erro interno ao buscar tarefas"});
    }
})

routes.post("/novaTarefa", async(req,res) =>{
    const {nome, data, descricao, idManipulaTarefa} = req.body;
    const tarefa = new Tarefa(nome,data,descricao,idManipulaTarefa)
    try{
        const postTarefa = await criarTarefa(tarefa)
        if(postTarefa){
            return res.status(200).json({message: "Tarefa salva"});
        }
        else{
            return res.status(401).json({message: "Ao menos um campo deve ser preenchido"});
        }
    }
    catch (error){
        console.error('Erro ao criar contato:', error.message);
        return res.status(500).json({ message: "Erro interno ao criar contato" });
    }
})

routes.put("/updateTarefa", async(req,res) =>{
    const {id, idManipulaTarefa, nome, data, descricao} = req.body;

    const novosDados = {
        nome: nome,
        data: data,
        descricao: descricao
    }

    try{
        const attTarefa = await updateTarefa(idManipulaTarefa,id,novosDados);
        if(attTarefa){
            return res.status(200).json(attTarefa);
        }
    }
    catch(error){
        console.error('Erro ao atualizar tarefa:', error.message);
        return res.status(500).json({ message: "Erro interno ao atualizar tarefa" });

}})

routes.delete("/deleteTarefa", async(req,res) =>{
    const contatoId = req.headers['id-contato'];
    const id = req.headers['id-tarefa'];
    try{
        const deletar = await deleteTarefa(contatoId, id);
        if(deletar){
            res.status(200).json({message: "Tarefa deletada"})
        }
    }catch(error){
        console.error('Erro ao deletar tarefa:', error.message);
        return res.status(500).json({ message: "Erro interno ao deletar tarefa" });
    }
})

routes.post("/novaMensagem", async(req,res) =>{
    const {emissor, receptor, conteudo  } = req.body;
    const mensagem = new Mensagem(emissor, receptor, conteudo )
    try{
        const postMensagem = await criarMensagem(mensagem)
        if(postMensagem){
            return res.status(200).json({message: "Mensagem enviada"});
        }
        else{
            return res.status(401).json({message: "Mensagem em branco"});
        }
    }
    catch (error){
        console.error('Erro ao enviar mensagem:', error.message);
        return res.status(500).json({ message: "Erro interno ao enviar mensagem" });
    }
})

routes.get("/buscarMensagens", async(req,res) =>{
    const idLogado = req.headers['id-logado'];
    try{
        const buscar = await buscarMensagens(idLogado);
        if(buscar){
            res.status(200).json(buscar)
        }
    }catch(error){
        console.error('Erro ao buscar mensagens:', error.message);
        return res.status(500).json({ message: "Erro interno ao buscar mensagens"});
    }
})
  
module.exports = routes;
