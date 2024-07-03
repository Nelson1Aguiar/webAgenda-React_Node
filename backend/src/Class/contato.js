class Contato {
    constructor(nome, numero, email, id) {
        this.nomeContato = nome;
        this.numeroContato = numero;
        this.emailContato = email;
        this.idPai = id;
    }

    get nome() {
        return this.nomeContato;
    }

    set nome(Nome) {
        this.nomeContato = Nome;
    }
    get numero() {
        return this.numeroContato;
    }

    set numero(Numero) {
        this.numeroContato = Numero;
    }

    get email() {
        return this.emailContato;
    }

    set email(Email) {
        this.emailContato = Email;
    }

    get id_User() {
        return this.idPai;
    }

    set id_User(Id) {
        this.idPai = Id;
    }

}

module.exports = Contato
