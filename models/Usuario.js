const fs = require('node:fs');
const { compileFunction } = require('node:vm');

class Usuario {
    constructor(id, senha, nome, endereco,email){
        this.id = id;
        this.senha = senha;
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
    }
}

class UsuarioFuncoes {
    constructor(filePath) {
        this.filePath = filePath;
        this.usuarios = this.lerUsuarios() // uso na linha 43
    }

    lerUsuarios() {
        try {
            const usuarioJSON = fs.readFileSync(this.filePath,'utf-8');
            return JSON.parse(usuarioJSON);
        } catch (error) {
            return[]
        }
    }

    salvarUsuarios(){
        const usuarioJSON = JSON.stringify(this.usuarios, null , 2 );
        fs.writeFileSync(this.filePath, usuarioJSON, 'utf-8')
    }

    adicionarUsuarios(senha, nome, endereco,email) {
        const id = this.identificarUltimoIdUsuarios() + 1;
        const novoUsuario = new Usuario(id, senha, nome, endereco,email);
        this.usuarios.push(novoUsuario);
        this.salvarUsuarios();
        console.log('Funcionário adicionado com sucesso!');
    }

    removerUsuarios(id){
        this.usuarios = this.usuarios.filter( usuario => usuario.id !== id) ;
        this.salvarUsuarios ();
        console.log('Funcionário removido com sucesso!')
    }

    identificarUltimoIdUsuarios(){
        return this.usuarios[this.usuarios.length-1].id;
    }

    login(email, senha) {

        //  Busca usuário no banco de dados 'user.json'
        //  caso exista retorne o objeto usuário
        
        
        const usuario = this.usuarios.find((usuario) => {
            
            if(usuario.email === email && usuario.senha === senha){
                return usuario;
            }
            return null;
        });

        if(!usuario) {
            console.error('Algo deu errado. Ou não existe esse usuário ou suas credenciais estão incorretas.');
            return false;
        }

        const userLogadoPath = 'database/userLogado.json'; // Caminho para o banco de dados do user logado
        const usuarioJSON = JSON.stringify(usuario, null , 2 );
        const usuarioLogado = fs.readFileSync(userLogadoPath,'utf-8');

        if(!usuarioLogado) {
            fs.writeFileSync(userLogadoPath, usuarioJSON, 'utf-8');
            console.log('Usuário logado!')
            return true;
        } else {
            console.error('Já existe um usuário logado. Saia para entrar.');
            return false;
        }
    }
   
}

const usuarioJSON = new UsuarioFuncoes('database/usuarios.json');

module.exports = usuarioJSON;
