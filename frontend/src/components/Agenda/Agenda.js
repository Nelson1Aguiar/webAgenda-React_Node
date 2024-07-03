import './agenda.css';
import { useEffect, useState } from 'react';
import apagar from './img\\iconesTeclado\\excluir.png';
import ligar from './img\\iconesTeclado\\whatsapp.png';
import AddCtt from './img\\iconesMenu\\adicionar-amigo.png';
import deleteCtt from './img\\iconesMenu\\ExcluirContato.png';
import updateCtt from './img\\iconesMenu\\atualizar.png';
import listaCtt from './img\\iconesMenu\\agenda.png';
import voltar from './img\\iconesMenu\\volte.png';
import perfil from './img\\iconesMenu\\perfil.png';
import iconeAtualizar from './img\\iconesMenu\\contatos.png';
import iconeDiscar from './img\\iconesMenu\\teclado.png';
import iconeDeletar from './img\\iconesMenu\\apagar.png';
import iconeConfirma from './img\\iconesMenu\\marca-de-verificacao.png'
import AdicionarCtt from './ComponentsAgenda/addCtt';
import UpdateContato from './ComponentsAgenda/attCtt';
import MenuPadrao from './ComponentsAgenda/menu';
import AttCttCampos from './ComponentsAgenda/attCttCampos';
import ListarContatos from './ComponentsAgenda/listarCtt';
import DeletarContato from './ComponentsAgenda/deleteContato';
import tarefasIcon from './img/iconesMenu/lista-de-afazeres.png';
import mensagemIcon from './img/iconesMenu/balao-de-bate-papo.png';
import TarefasMenuScreen from './ComponentsAgenda/tarefas/tarefasMenu';
import AddTarefa from './ComponentsAgenda/tarefas/addTarefas';
import ListaTarefas from './ComponentsAgenda/tarefas/listarTarefas';
import MensagemMenu from './ComponentsAgenda/mensagem/mensagens';
import listarMensagemIcon from './img/iconesMenu/mensagens-de-texto.png';
import enviarMensagensIcon from './img/iconesMenu/enviado.png';
import EnviarMensagem from './ComponentsAgenda/mensagem/enviaMensagem';
import ListarMensagens from './ComponentsAgenda/mensagem/listaMensagem';
import iconeSair from './img/iconesMenu/sair.png';
import axios from 'axios';

function AgendaPacientes({ setScreen, idLogado }) {
    const [numero, setNumero] = useState('');
    const [menuSelecionado, setMenuSelecionado] = useState("AGENDA");
    const [nomeCtt, setNomeCtt] = useState('');
    const [numCtt, setNumCtt] = useState('');
    const [email, setEmail] = useState('');
    const [contatosFiltrados, setContatosFiltrados] = useState([]);
    const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
    const [mensagensFiltradas, setMensagensFiltradas] = useState([]);
    const [confirmacao, setConfirmacao] = useState(false);
    const [cttAtualizar, setCttAtualizar] = useState({ nome: '', numero: '', email: '' });
    const [idManipulaTarefa, setIdManipulaTarefa] = useState('');

    useEffect(() => {
        const buscaEmBranco = async () => {
            try {
                const filtro = await axios.get("http://localhost:3001/buscarContato/NadaDigitado",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "id-logado": idLogado
                        },
                    }
                );
                setContatosFiltrados(filtro.data);
            }
            catch (error) {
                if (!error?.response) {
                    alert("Erro ao se comunicar com o servidor")
                }
            }
        }

        const buscarMensagens = async () => {
            try {
                const filtro = await axios.get("http://localhost:3001/buscarMensagens",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "id-logado": idLogado
                        },
                    }
                );
                setMensagensFiltradas(filtro.data);
            }
            catch (error) {
                if (!error?.response) {
                    alert("Erro ao se comunicar com o servidor")
                }
            }
        }
        const buscaTarefas = async () => {
            try {
                const filtro = await axios.get("http://localhost:3001/buscarTarefas",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "id-logado": idLogado
                        },
                    }
                );
                setTarefasFiltradas(filtro.data);
            }
            catch (error) {
                if (!error?.response) {
                    alert("Erro ao se comunicar com o servidor")
                }
            }
        }

        if(menuSelecionado === "AttContato" || menuSelecionado === "ListarContato" || menuSelecionado==="DeleteContato"){
            buscaEmBranco();
        }
        else if(menuSelecionado === "listarTarefa"){
            buscaTarefas();
        }
        else if(menuSelecionado === "listaMensagem"){
            buscarMensagens();
        }
    }, [idLogado, menuSelecionado]);

    const discar = (value) => {
        setNumero(numero + value);
    }

    const puxaNumero = (value) => {
        setNumero(value);
    }

    const apagarDiscagem = () => {
        var numeroAux = numero;
        numeroAux = numeroAux.slice(0, -1);
        setNumero(numeroAux);
    }

    const mudarConteudoMenu = (novoConteudo) => {
        setMenuSelecionado(novoConteudo);
    };

    const mensagemWpp = () => {
        if (numero.length === 0) {
            alert("Número não digitado!");
            return;
        }
        var wpp = "https://wa.me/55".concat(numero);
        window.open(wpp, '_blank');
    }

    const DigitaNome = (event) => {
        const valor = event.target.value;
        setNomeCtt(valor);
    }

    const DigitaNumero = (event) => {
        const valor = event.target.value;
        setNumCtt(valor);
    }
    const DigitaEmail = (event) => {
        const valor = event.target.value;
        setEmail(valor);
    }

    const criarNovoContato = async () => {
        try {
            await axios.post("http://localhost:3001/criarContato",
                { nomeCtt, numCtt, email, idLogado },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setNomeCtt('');
            setNumCtt('');
            setEmail('');
            setConfirmacao(true);
            setTimeout(function () {
                setConfirmacao(false);
            }, 2000);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
            else if (error.response.status === 401) {
                alert("Campos de nome e de numero devem ser preenchidos");
            }
            else if (error.response.status === 402) {
                alert("Número já cadastrado");
            }
        }
    }

    const buscar = async (event) => {
        let termo = event.target.value.toUpperCase();

        if (termo.trim() === '') {
            termo = "NadaDigitado"
        }

        try {
            const filtro = await axios.get("http://localhost:3001/buscarContato/" + termo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "id-logado": idLogado
                    },
                }
            );
            setContatosFiltrados(filtro.data);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
        }
    }

    

    const buscarUnicoContato  = (id) =>{
        const contato = contatosFiltrados.filter(contatoFiltrado => contatoFiltrado.id === id)
        return contato[0]
    }

    const AtualizarContato = async () => {
        const numeroAntigo = cttAtualizar.numero;
        try {
            await axios.put("http://localhost:3001/updateContato",
                { numeroAntigo, idLogado, numCtt, nomeCtt, email },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setNomeCtt('');
            setNumCtt('');
            setEmail('');
            setConfirmacao(true);
            setContatosFiltrados(contatosFiltrados.map(element => {
                if (element.numero === numeroAntigo) {
                    return {
                        ...element,
                        numero: numCtt,
                        nome: nomeCtt,
                        email: email
                    };
                }
                return element;
            }));
            setTimeout(function () {
                setConfirmacao(false);
            }, 2000);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
            else if (error.response.status === 401) {
                alert("Número já pertence a outro contato ou nome está em branco!")
            }
        }
    }

    const deletarContato = async (id) => {
        try {
            await axios.delete("http://localhost:3001/deleteContato/" + id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "id-logado": idLogado
                    },
                }
            );
            const novaLista = contatosFiltrados.filter(contato => contato.id !== id);
            setContatosFiltrados(novaLista);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
        }
    }

    const novaTarefa = async (nome, data, descricao) => {
        try {
            await axios.post("http://localhost:3001/novaTarefa",
                { nome, data, descricao, idManipulaTarefa },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setConfirmacao(true);
            setTimeout(function () {
                setConfirmacao(false);
            }, 2000);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
            else if (error.response.status === 401) {
                alert("Ao menos um campo deve ser preenchido");
            }
        }
    }

    const deletaTarefa = async (id, contato) => {
        try {
            await axios.delete("http://localhost:3001/deleteTarefa",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "id-contato": contato,
                        "id-tarefa": id
                    },
                }
            );
            const novaLista = tarefasFiltradas.filter(tarefa => tarefa.id !== id);
            setTarefasFiltradas(novaLista);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
        }
    }

    const attTarefa = async (nome, data, descricao, id) => {
        try {
            await axios.put("http://localhost:3001/updateTarefa",
                { id, idManipulaTarefa, nome, data, descricao },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setConfirmacao(true);
            setTarefasFiltradas(tarefasFiltradas.map(element => {
                if (element.id === id) {
                    return {
                        ...element,
                        nome: nome,
                        data: data,
                        descricao: descricao
                    };
                }
                return element;
            }));
            setTimeout(function () {
                setConfirmacao(false);
            }, 2000);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
        }
    }

    const enviarMensagem = async (emissor, receptor, conteudo) => {
        try {
            await axios.post("http://localhost:3001/novaMensagem",
                { emissor, receptor, conteudo },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setConfirmacao(true);
            setTimeout(function () {
                setConfirmacao(false);
            }, 2000);
        }
        catch (error) {
            if (!error?.response) {
                alert("Erro ao se comunicar com o servidor")
            }
        }
    }

    return (
        <div className="container">
            <div className="teclado">
                <p id="numero">{numero}</p>
                <div className="botao">
                    <button id="1" onClick={() => discar('1')}>1</button>
                    <button id="2" onClick={() => discar('2')}>2</button>
                    <button id="3" onClick={() => discar('3')}>3</button>
                </div>
                <div className="botao">
                    <button id="4" onClick={() => discar('4')}>4</button>
                    <button id="5" onClick={() => discar('5')}>5</button>
                    <button id="6" onClick={() => discar('6')}>6</button>
                </div>
                <div className="botao">
                    <button id="7" onClick={() => discar('7')}>7</button>
                    <button id="8" onClick={() => discar('8')}>8</button>
                    <button id="9" onClick={() => discar('9')}>9</button>
                </div>
                <div className="botao">
                    <button id="numAsterisco" onClick={() => discar('*')}>*</button>
                    <button id="0" onClick={() => discar('0')}>0</button>
                    <button id="numHash" onClick={() => discar('#')}>#</button>
                </div>
                <div className="botao">
                    <button className="ligar" id="ligar" onClick={mensagemWpp}>
                        <img src={ligar} alt='botao de Ligar' />
                    </button>
                    <button className="apagar" id="apagar" onClick={apagarDiscagem}>
                        <img src={apagar} alt='botao de Apagar' />
                    </button>
                </div>
            </div>
            {menuSelecionado === "AGENDA" && (
                <MenuPadrao AddCtt={AddCtt} updateCtt={updateCtt} listaCtt={listaCtt} deleteCtt={deleteCtt} mudarConteudoMenu={mudarConteudoMenu}
                    voltar={voltar} setScreen={setScreen} tarefasIcon={tarefasIcon} mensagemIcon={mensagemIcon} iconeSair={iconeSair} />
            )}

            {menuSelecionado === "AddContato" && (
                <AdicionarCtt DigitaNome={DigitaNome} DigitaNumero={DigitaNumero} DigitaEmail={DigitaEmail} criarNovoContato={criarNovoContato}
                    mudarConteudoMenu={mudarConteudoMenu} voltar={voltar} perfil={perfil} iconeConfirma={iconeConfirma} confirmacao={confirmacao} />
            )}

            {menuSelecionado === "AttContato" && (
                <UpdateContato voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} buscar={buscar} contatosFiltrados={contatosFiltrados}
                    setCttAtualizar={setCttAtualizar} iconeAtualizar={iconeAtualizar} />
            )}

            {menuSelecionado === "AttContatoCampos" && (
                <AttCttCampos DigitaNome={DigitaNome} DigitaNumero={DigitaNumero} DigitaEmail={DigitaEmail} AtualizarContato={AtualizarContato}
                    mudarConteudoMenu={mudarConteudoMenu} voltar={voltar} perfil={perfil} confirmacao={confirmacao} iconeConfirma={iconeConfirma} />
            )}

            {menuSelecionado === "ListarContato" && (
                <ListarContatos voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} listaContato={contatosFiltrados} puxaNumero={puxaNumero}
                    iconeDiscar={iconeDiscar} />
            )}

            {menuSelecionado === "DeleteContato" && (
                <DeletarContato voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} contatosFiltrados={contatosFiltrados} buscar={buscar}
                    iconeDeletar={iconeDeletar} deletarContato={deletarContato} />
            )}

            {menuSelecionado === "tarefas" && (
                <TarefasMenuScreen voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} />
            )}

            {menuSelecionado === "addTarefa" && (
                <AddTarefa voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} contatosFiltrados={contatosFiltrados} buscar={buscar}
                    confirmacao={confirmacao} iconeConfirma={iconeConfirma} tarefasIcon={tarefasIcon} novaTarefa={novaTarefa}
                    setContatoAddTarefa={setIdManipulaTarefa} />
            )}

            {menuSelecionado === "listarTarefa" && (
                <ListaTarefas voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} deletaTarefa={deletaTarefa} attTarefa={attTarefa}
                    menuSelecionado={menuSelecionado} confirmacao={confirmacao} iconeConfirma={iconeConfirma} tarefasIcon={tarefasIcon}
                    tarefasFiltradas={tarefasFiltradas} setContatoManipulaTarefa={setIdManipulaTarefa} buscarUnicoContato={buscarUnicoContato} />
            )}

            {menuSelecionado === "mensagens" && (
                <MensagemMenu voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} listarMensagemIcon={listarMensagemIcon}
                    enviarMensagensIcon={enviarMensagensIcon} />
            )}

            {menuSelecionado === "enviaMensagem" && (
                <EnviarMensagem voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} contatosFiltrados={contatosFiltrados} buscar={buscar}
                    iconeEnviar={enviarMensagensIcon} iconeMensagem={mensagemIcon} confirmacao={confirmacao} iconeConfirma={iconeConfirma}
                    enviarMensagem={enviarMensagem} />
            )}

            {menuSelecionado === "listaMensagem" && (
                <ListarMensagens voltar={voltar} mudarConteudoMenu={mudarConteudoMenu} mensagensFiltradas={mensagensFiltradas} buscarUnicoContato={buscarUnicoContato} />
            )}
        </div>
    );
}

export default AgendaPacientes;
