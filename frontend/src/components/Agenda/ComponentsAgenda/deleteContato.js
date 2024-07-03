import React from "react";

const DeletarContato = ({ voltar, mudarConteudoMenu, contatosFiltrados, buscar, iconeDeletar, deletarContato }) => {
    return (
        <div className='NovoMenu'>
            <button className='buttonVoltar' onClick={() => mudarConteudoMenu("AGENDA")}>
                <img className="invertColor" src={voltar} alt='' width={"60%"} onClick={() => mudarConteudoMenu("AGENDA")} />
            </button>
            <div className='containerInputFiltro'>
                <input placeholder='Digite o nome, número ou e-mail' type='text' onChange={buscar}></input>
            </div>
            {contatosFiltrados.map((contato) => (
                <div key={contato.id} className='Contatos'>
                    <p>Nome: {contato.nome}</p>
                    <p>Número: {contato.numero}</p>
                    {contato.email && <p>Email: {contato.email}</p>}
                    <button onClick={() => deletarContato(contato.id)}>
                        <img className="diminui" src={iconeDeletar} alt='' width={"60%"} />
                    </button>
                </div>
            ))}
        </div>
    )
}
export default DeletarContato;