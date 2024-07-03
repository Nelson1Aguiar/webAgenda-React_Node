class Pessoa {
    constructor(nome, email, senha) {
        this.nomePessoa = nome;
        this.senhaPessoa = senha;
        this.emailPessoa = email;
    }

    get nome() {
        return this.nomePessoa;
    }

    set nome(Nome) {
        this.nomePessoa = Nome;
    }
    get senha() {
        return this.senhaPessoa;
    }

    set senha(Senha) {
        this.senhaPessoa = Senha;
    }

    get email() {
        return this.emailPessoa;
    }

    set email(Email) {
        this.emailPessoa = Email;
    }
}

module.exports = Pessoa;