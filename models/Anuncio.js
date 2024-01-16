const fs = require('node:fs')

class Anuncio {
    constructor( id, idProprietario, idPropriedade, titulo, descricao, status ){
        this.id = id
        this.idProprietario = idProprietario
        this.idPropriedade = idPropriedade
        this.titulo = titulo
        this.descricao = descricao
        this.status = status
    }
}

class AnuncioFuncoes {
    constructor(filePath){
        this.filePath = filePath
        this.anuncios = this.lerAnuncios()
    }

    lerAnuncios(){
        try{
            const anunciosJSON = readFileSync(this.filePath,'utf-8')
            return JSON.parse(propriedadesJSON)
        } catch (error) {
            return[]
        }
    }

    salvarAnuncios(){
        const anuncioJSON = JSON.stringify(this.anuncio, null, 2)
        fs.writeFileSync(this.filePath, anuncioJSON, 'utf-8')
    }

    adicionarAnuncios( titulo, descricao, status){
        const id = this.identificarUltimoIdAnuncios() + 1 
        const novoAnuncio = new Anuncio(id, idProprietario, idPropriedade, titulo, descricao, status);
        this.anuncios.push(novoAnuncio);
        this.salvarAnuncios()
        console.log('Anúncio adicionado com sucesso!' )
    }

    listarAnuncios() {
        console.log('Lista de anúncios:')
        this.anuncios.forEach (Anuncio => {
            console.log(
                `
                ID: ${anuncio.id};
                ID proprietario: ${anuncio.idProprietario}
                ID propriedade: ${anuncio.idPropriedade}
                titulo: ${anuncio.titulo}
                descricao: ${anuncio.descricao}
                status: ${anuncio.status}
                `
            )
        })

    }

    buscarAnunciosPorTitulo(titulo) {
        return this.anuncios.find(anuncio => anuncio.titulo === titulo )
    }

    atualizarAnuncios( novoTitulo, novaDescricao, novoStatus) {
        const anuncioIndex = this.anuncios.findIndex(anuncio => anuncio.id === id );{
            if (anuncioIndex !== -1 ); {
                this.anuncios[anuncioIndex].IdProprietario = novoIdProprietario
                this.anuncios[anuncioIndex].idPropriedade = novoIdPropriedade
                this.anuncios[anuncioIndex].titulo = novoTitulo
                this.anuncios[anuncioIndex].descricao = novaDescricao
                this.anuncios[anuncioIndex].status = novoStatus
                this.salvarAnuncios()
                console.log ('Anúncio atualizado com sucesso!')
            } //else console.log('Anúncio não encontrado!') ;
        }
    }

    removerAnuncios(id){
        this.anuncios = this.anuncios.filter(anuncio => anuncio.id !== id)
        this.salvarAnuncios()
        console.log('Anúncio removido com sucesso!')
    }

    identificarUltimoIdAnuncios(){
        let ultimoId = this.anuncios[this.anuncios.length-1]?.id

        if(!ultimoId){
            ultimoId = 0 
        }
        return ultimoId ;
    }

    

}

const anunciosJSON = new AnuncioFuncoes('database/anuncios.json')

module.exports = anunciosJSON 