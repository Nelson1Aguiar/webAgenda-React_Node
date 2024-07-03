import { useState } from 'react';
import moment from 'moment';
import iconeAtualizaTarefa from './img/atualizar.png'
import iconeApagaTarefa from './img/excluirTarefa.png'

function ListaTarefas({ voltar, mudarConteudoMenu, deletaTarefa, attTarefa, confirmacao, iconeConfirma, tarefasIcon, tarefasFiltradas, setContatoManipulaTarefa, buscarUnicoContato }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(null);
    const [tela, setTela] = useState('Ctts');
    const [idAttTarefa, setIdAttTarefa] = useState(0);

    return (
        <div>
            {tela === 'Ctts' && (
                <div className='NovoMenu'>
                    <button className='buttonVoltar' onClick={() => mudarConteudoMenu("tarefas")}>
                        <img className="invertColor" src={voltar} alt='' width={"60%"} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img className="invertColor" alt='' src={iconeApagaTarefa} width={'10%'}></img>
                        <p>Clique para apagar tarefa</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img className="invertColor" alt='' src={iconeAtualizaTarefa} width={'10%'}></img>
                        <p>Clique para atualizar tarefa</p>
                    </div>
                    {tarefasFiltradas.map(tarefas => (
                        <div key={tarefas.id} className='Contatos'>
                            <p>Tarefa: {tarefas.nome}</p>
                            <p>Descrição: {tarefas.descricao}</p>
                            <p>Data: {moment(tarefas.data).format('DD/MM/YYYY')}</p>
                            <p>Número: {buscarUnicoContato(tarefas.contatoId).numero}</p>
                            <p>Nome: {buscarUnicoContato(tarefas.contatoId).nome}</p>
                            <div style={{ display: 'flex' }}>
                                <button onClick={() => deletaTarefa(tarefas.id, tarefas.contatoId)}>
                                    <img className="invertColor diminui" alt='' src={iconeApagaTarefa} width={'60%'}></img>
                                </button>
                                <button onClick={() => {
                                    setTela('attTarefas'); setContatoManipulaTarefa(tarefas.contatoId);
                                    setIdAttTarefa(tarefas.id)
                                }}>
                                    <img className="invertColor diminui" alt='' src={iconeAtualizaTarefa} width={'60%'}></img>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {tela === 'attTarefas' && (
                <div className="NovoMenu">
                    <button className='buttonVoltar' onClick={() => setTela('Ctts')}>
                        <img className="invertColor" src={voltar} alt='' width={"60%"} />
                    </button>
                    <div className='containerCampos'>
                        <img className="invertColor" src={tarefasIcon} alt='' width={"30%"} />
                        <input placeholder='Digite o título da tarefa' type='text' onChange={(e) => setTitulo(e.target.value)}></input>
                        <input placeholder='Digite a data' type='date' onChange={(e) => setData(e.target.value)}></input>
                        <input placeholder='Digite a descrição' type='text' onChange={(e) => setDescricao(e.target.value)}></input>
                        <button onClick={() => attTarefa(titulo, data, descricao, idAttTarefa)}>Atualizar</button>
                        {confirmacao === true && (
                            <div className='confirmacao'>
                                <p>Tarefa atualizada</p>
                                <img src={iconeConfirma} alt='' width={'30%'} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default ListaTarefas;