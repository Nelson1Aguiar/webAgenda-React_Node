function ListarMensagens({ voltar, mudarConteudoMenu, mensagensFiltradas, buscarUnicoContato }) {
    return (
        <div className='NovoMenu'>
            <button className='buttonVoltar' onClick={() => mudarConteudoMenu("mensagens")}>
                <img className="invertColor" src={voltar} alt='' width={"60%"} />
            </button>
                {mensagensFiltradas.map(mensagens => (
                    <div key={mensagens.id} className='Contatos'>
                        <p>Enviou: {buscarUnicoContato(mensagens.emissor).nome}</p>
                        <p>Recebeu: {buscarUnicoContato(mensagens.receptor).nome}</p>
                        <p style={{flexWrap:"wrap"}}>Mensagem: {mensagens.conteudo}</p>
                    </div>
                ))}
        </div>
    )
}
export default ListarMensagens;