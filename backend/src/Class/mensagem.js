class Mensagem {
    constructor(emissor, receptor, conteudo) {
        this.emissorMensagem = emissor;
        this.receptorMensagem = receptor;
        this.conteudoMensagem = conteudo;
    }

    get emissor() {
        return this.emissorMensagem;
    }

    set emissor(Emissor) {
        this.emissorMensagem = Emissor;
    }
    get receptor() {
        return this.receptorMensagem;
    }

    set receptor(Receptor) {
        this.receptorMensagem = Receptor;
    }

    get conteudo() {
        return this.conteudoMensagem;
    }

    set conteudo(Conteudo) {
        this.conteudoMensagem = Conteudo;
    }
}

module.exports = Mensagem