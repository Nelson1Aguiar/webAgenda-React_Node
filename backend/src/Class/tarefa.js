class Tarefa {
    constructor(nome, data, descricao, id) {
        this.nomeTarefa = nome;
        this.dataTarefa = data;
        this.descricaoTarefa = descricao;
        this.idContato = id;
    }

    get nome() {
        return this.nomeTarefa;
    }

    set nome(Nome) {
        this.nomeTarefa = Nome;
    }
    get data() {
        return this.dataTarefa;
    }

    set data(Data) {
        this.dataTarefa = Data;
    }

    get descricao() {
        return this.descricaoTarefa;
    }

    set descricao(Descricao) {
        this.descricaoTarefa = Descricao;
    }

    get id_Contato() {
        return this.idContato;
    }

    set id_Contato(Id) {
        this.idContato = Id;
    }
}

module.exports = Tarefa