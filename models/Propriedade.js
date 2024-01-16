// Criando banco de dados :
const fs = require('node:fs');

// Ddados das propriedades:

class Propriedade {
    constructor(id, nome, endereco, capacidade, quartos, preco, disponibilidade) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.capacidade = capacidade;
        this.quartos = quartos;
        this.preco = preco;
        this.disponibilidade = disponibilidade;
    }
}

// Classe responsavel por modificar os dados da propriedade:

class PropriedadeFuncoes {
    constructor(filePath) {
        this.filePath = filePath;
        this.propriedades = this.lerPropriedades() // Volta um lista(array) de Propriedades
    }

    lerPropriedades() {
        try {
            const propriedadesJSON = fs.readFileSync(this.filePath, 'utf-8');

            return JSON.parse(propriedadesJSON);
        } catch (error) {
            return [];
        }
    }
    

    salvarPropriedades(){
        const propriedadesJSON = JSON.stringify(this.propriedades,null,2);
        fs.writeFileSync(this.filePath, propriedadesJSON, 'utf-8')
    }

    adicionarPropriedades(nome, endereco, capacidade, quartos, preco, disponibilidade){
        const id = this.identificarUltimoIdPropriedades() + 1;
        const novaPropriedade = new Propriedade(id, nome, endereco, capacidade, quartos, preco, disponibilidade)
        this.propriedades.push(novaPropriedade);
        this.salvarPropriedades();
        console.log('Propriedade adicionada com sucesso!');
    }

    listarPropriedades(){
        console.log('Lista de propriedades:');
        this.propriedades.forEach( propriedade => {
            console.log(
                `
                ID = ${propriedade.id},
                nome = ${propriedade.nome},
                endereco = ${propriedade.endereco},
                capacidade = ${propriedade.capacidade}
                quartos = ${propriedade.quartos}
                preco = ${propriedade.endereco}
                disponibilidade = ${propriedade.disponibilidade}
                `
            )
        })
    }

    buscarPropriedadesPorNome(nome) {
        return this.propriedades.find(propriedade => propriedade.nome === nome);
    }
    
    atualizarPropriedades(novoNome, novoEndereco, novaCapacidade, novoQuarto, novoPreco, novaDisponibilidade ){
        const propriedadeIndex = this.propriedades.findIndex( propriedade => propriedade.id === id );

        if (propriedadeIndex !== -1) {
            this.propriedades[hospedes.Index].nome = novoNome
            this.propriedades[hospedes.Index].contato= novocontato
            this.propriedades[hospedes.Index].endereco = novoEndereco
            this.propriedades[hospedes.Index].capacidade = novaCapacidade
            this.propriedades[hospedes.Index].quarto = novoQuarto
            this.propriedades[hospedes.Index].preco = novoPreco
            this.propriedades[hospedes.Index].disponibilidade = novaDisponibilidade
            this.salvarPropriedades();
            console.log('Propriedade atualizada com sucesso!')
        } else {
            console.log('Propriedade não encontrada!')
            }
    }   
    
    removerPropriedades(id) {
        this.propriedades = this.propriedades.filter(propriedade => propriedade.id === id );
        this.salvarPropriedades()
        console.log('Propriedade removida com sucesso!')
    }

    identificarUltimoIdPropriedades(){
        let ultimoId = this.propriedades[this.propriedades.length-1]?.id

        if(!ultimoId){
            ultimoId = 0 
        }
        return ultimoId ;
    }
}  


const propriedadesJSON = new PropriedadeFuncoes('database/propriedade.js')

module.exports = propriedadesJSON