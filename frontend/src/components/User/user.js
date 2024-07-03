import './user.css';
import { useState} from 'react';
import axios from 'axios';
function Usuario({ setScreen, setIdLogado}) {
    const [nomeValue, setNomeValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [senhaValue, setSenhaValue] = useState("");
    const [tela, setTela] = useState('LOGIN');
    const [classe, setClasse] = useState('caixaLogin');
    const [aviso, setAviso] = useState("");

    const criarConta = async () => {
        try {
            await axios.post("http://localhost:3001/cadastro",
                {nomeValue, emailValue, senhaValue},
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setAviso("");
            mudaTela('LOGIN');
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
            else if (error.response.status === 401) {
                setAviso("ERROCADASTRO_PREENCHER");
            }
            else if (error.response.status === 402) {
                setAviso("ERROCADASTRO");
            }
        }
    }

    const logar = async () => {
        try {
            const response = await axios.post("http://localhost:3001/login",
                {emailValue, senhaValue},
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            const id = parseInt(response.data);
            setIdLogado(id);
            setScreen('homePage');
            setAviso("");
        } 
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
            else if (error.response.status === 401){
                setAviso("ERROLOGIN");
                console.log(error.response.data.error);
            }
        }
    }

    const mudaTela = (Tela) => {
        setEmailValue("");
        setSenhaValue("");
        setNomeValue("");
        setClasse("caixaLogin rotacao");
        setTimeout(function () {
            setClasse("caixaLogin");
        }, 0);
        setTela(Tela);
    }
    return (
        <div className="container">
            {tela === "LOGIN" && (
                <div className={classe}>
                    <h1 className='tituloLogin'>Acesse sua conta</h1>
                    <p className='paragrafoLogin'>E tenha acesso a todos os seus contatos</p>
                    <div className="camposLogin">
                        <label className='labelLogin' htmlFor="email">E-mail</label>
                        <input className='inputsLogin' id="email" placeholder="abc@mail.com" onChange={(e) => setEmailValue(e.target.value)}></input>
                        <br></br>
                        <label className='labelLogin' htmlFor="senha">Senha</label>
                        <input className='inputsLogin' id="senha" placeholder="***********" type='password' onChange={(e) => setSenhaValue(e.target.value)}></input>
                        {aviso === "ERROLOGIN" && (
                            <p className='mensagem'>E-mail e/ou senha incorretos</p>
                        )}
                        <div className='botoes'>
                            <button className='buttonLogin' onClick={logar}>Entrar</button>
                            <button className='buttonLogin' onClick={() => mudaTela("CADASTRO")}>Cadastre-se</button>
                        </div>
                    </div>
                </div>
            )}
            {tela === "CADASTRO" && (
                <div className={classe}>
                    <h1 className='tituloLogin'>Crie sua conta</h1>
                    <p className='paragrafoLogin'>E tenha acesso a todos os seus contatos</p>
                    <div className="camposCadastro">
                        <label className='labelLogin' htmlFor="nome">Nome Completo</label>
                        <input className='inputsLogin' id="nome" placeholder="Ex: João Rodrigues Lacerda" onChange={(e) => setNomeValue(e.target.value)}></input>
                        <br></br>
                        <label className='labelLogin' htmlFor="email">E-mail</label>
                        <input className='inputsLogin' id="email" placeholder="abc@mail.com" onChange={(e) => setEmailValue(e.target.value)}></input>
                        <br></br>
                        <label className='labelLogin' htmlFor="senha">Senha</label>
                        <input className='inputsLogin' id="senha" placeholder="***********" type='password' onChange={(e) => setSenhaValue(e.target.value)}></input>
                        {aviso === "ERROCADASTRO" && (
                            <p className='mensagem'>Endereço de e-mail já cadastrado</p>
                        )}
                        {aviso === "ERROCADASTRO_PREENCHER" && (
                            <p className='mensagem'>É necessário preencher todos os campos</p>
                        )}
                        <div className='botoes'>
                            <button className='buttonLogin' onClick={criarConta}>Criar Conta</button>
                        </div>
                    </div>
                    <p className='paragrafoLogin' style={{ marginBottom: 0 }}>Já tem uma conta?</p>
                    <p className='voltarLogin paragrafoLogin' onClick={() => mudaTela("LOGIN")}>Clique aqui!</p>
                </div>
            )}
        </div>
    )
}
export default Usuario;