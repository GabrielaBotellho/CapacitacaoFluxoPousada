const requisicao = require('readline-sync');
const Hospede = require('./models/Hospede.js');
const Propriedade = require('./models/Propriedade.js')
const Usuario = require('./models/Usuario.js');
const Anuncio = require('./models/Anuncio.js')
const Reserva = require('./models/Reserva.js')


// Menu do sistema: 

const mensagemMenu = `
-----------------------------------------------------  MENU  -----------------------------------------------------

    [1] Adicionar Hospede          [5] Buscar Hospede        [9]  Editar Hospede        [13] Excluir Hospede
    [2] Adicionar Propriedade      [6] Buscar Propriedade    [10] Editar Propriedade    [14] Excluir Propriedade
    [3] Adicionar Reserva          [7] Buscar Reserva        [11] Editar Reserva        [15] Excluir Reserva
    [4] Adicionar Anúncio          [8] Buscar Anúncio        [12] Editar Anúncio        [16] Excluir Anúncio
    

Escolha um item da lista: `

// Funcionario acessando o sistema: 

const mensagemLogin = `
-------- LOGIN --------

    [1] Acessar uma conta 
    [2]  Realizar cadastro
    
Escolha uma opção: `

const respostaLogin = requisicao.question(mensagemLogin)

// Acessando a conta:

if (respostaLogin === '1') {
    usuarioLogin = requisicao.question('Email:')
    senhaLogin = requisicao.question('Senha:')

    const logar = Usuario.login( usuarioLogin, senhaLogin) // resulta em true ou false

    if (logar === true ){
        respostaMenu = requisicao.question(mensagemMenu)

        switch (respostaMenu){
            case '1' : // Adicionando hospede: 
                var nome = requisicao.question('Nome: ')
                var endereco = requisicao.question('Endereço: ')
                var perguntaLocal = requisicao.question('Já frequentou a pousada: ')

                if (perguntaLocal == 'sim') {
                   respostaLocal = requisicao.question('Qual pousada ficou hospedado:')

                    historico = `O hóspede já ficou na ${respostaLocal}` 
                  
                } else historico = ('O hóspede nunca frequentou a pousada')
            
                Hospede.adicionarHospedes(nome, endereco, historico)
                break
            
            case '2': // Adicionando Propriedade: 
                 var nome = requisicao.question('Nome: ') 
                 var endereco = requisicao.question('Endereço: ')
                 var capacidade = requisicao.question('Capacidade de hóspedes: ')
                 var quartos = requisicao.question('Quantidade de quartos: ')
                 var preco = requisicao.question('Valor por noite: ')
                 var disponibilidade = requisicao.question('Disponibilidade: ')

                 Propriedade.adicionarPropriedades(nome, endereco,capacidade, quartos, preco, disponibilidade)
                 break
            
            case '3': // Adicionar Reserva: 

            //Erro na parte de buscar a propriedade
                //Buscando o hóspede que vai reservar
                var nomeHospede = requisicao.question('Nome do hóspede: ') 
                
                // vinculando a lista do hospede encontrado pela funcao buscar
                hospedeEncontrado = Hospede.buscarHospedesPorNome(nomeHospede)
                console.log('hospedeEncontrado', hospedeEncontrado)
                // atrinuindo o id desse hospede a idHospede:
                {idHospede:hospedeEncontrado.id}
                console.log(idHospede)

                //Buscando a propriedade que vai ser reservada:
                var nomePropriedade = requisicao.question('Nome da pousada: ')
                
                // vinculando a lista do hospede encontrado pela funcao buscar
                propriedadeEncontrada = Propriedade.buscarPropriedadesPorNome(nomePropriedade)
                console.log('propriedadeEncontrada', propriedadeEncontrada)
                let idPropriedadeReserva = {}
                {idPropriedadeReserva:propriedadeEncontrada.id}
                console.log(idPropriedadeReserva)
                
                //datas de checkin e checkout são definidos pelo funcionário:
                var checkin = requisicao.question('Data do checkin:')
                var checkout =requisicao.question('Data do checkout:')    
                
                Reserva.adicionarReservas(idPropriedadeReserva, idHospede, checkin, checkout)
                
            break

            case '4' : // Adicionar Anuncio: 
                //var idProprietario = // usar a busca por nome para buscar o id 
                //var idPropriedade = // usar a busca por nome para buscar o id
                //var idProprietario = 0 //criar funcao para proprietarios 
                //var idPropriedade = 0 //vincular com lista de propriedades
                var titulo = requisicao.question('Título do anúncio:')
                var descricao =requisicao.question('Descrição do anúncio:')
                var status = requisicao.question('Status do anúncio:') 

                Anuncio.adicionarAnuncios( titulo, descricao, status)

                break
            
            case '5': // Buscando Hospede: 
                var nome = requisicao.question('Nome: ') 
                
                // vinculando a lista do hospede encontrado pela funcao buscar
                hospedeEncontrado = Hospede.buscarHospedesPorNome(nome) 
                
                if (hospedeEncontrado === -1 ){ // se não achar hóspede com nome correspondente devolve -1 
                    console.error('Hospede nao encontrado!')
                }
                // Interface que será mostrada para o usuário
                hospedeEncontrado = 
                `   Usuário encontrado com sucesso!
            Nome : ${hospedeEncontrado.nome}
            Endereço: ${hospedeEncontrado.endereco}
            Histórico: ${hospedeEncontrado.historico}
                                     `
                console.log(hospedeEncontrado)//mostrar a interface para o usuario
                break

            case '6': // Buscando Propriedade: 
                var nome = requisicao.question('Nome: ') 
                
                // Vinculando a lista da propriedade encontrada pela funcao buscar 
                propriedadeEncontrada = Propriedade.buscarPropriedadesPorNome(nome) 

                if (propriedadeEncontrada === -1 ) { //se não achar propriedade com nome correspondente devolve -1
                    console.error('Propriedade não encontrada!')
                }
                
                // Interface que será mostrada para o usuário:
                propriedadeEncontrada = 
                 ` Propriedade encontrada com sucesso!
            Nome: ${propriedadeEncontrada.nome}
            Endereco: ${propriedadeEncontrada.endereco}
            Capacidade de hóspedes: ${propriedadeEncontrada.capacidade}
            Quartos: ${propriedadeEncontrada.quartos}
            Preco: ${propriedadeEncontrada.preco}
            Disponibilidade : ${propriedadeEncontrada.disponibilidade}
                                          `
                console.log(propriedadeEncontrada) //mostrar a interface para o usuario
                break

            case '7': // Buscando Reserva: 
                var nomeHospede = requisicao.question('Nome do hóspede: ') 
                
                //vincular a lista de reserva encontrada pela funcao buscar
                reservaEncontrada = Reserva.buscarReservasPorNome(nomeHospede)

                if (reservaEncontrada === -1){// se não achar correspondente devolve -1
                    console.error('Nenhuma reserva encontrada!')
                }

                // interface que será mostrada para o usuario: 
                reservaEncontrada = `
            Reserva encontrada com sucesso!
        Nome do hóspede: ${reservaEncontrada.nomeHospede}
        Título: ${reservaEncontrada.titulo}
        Descricao: ${reservaEncontrada.descricao}
        Status: ${reservaEncontrada.status}    
                `

                console.log(reservaEncontrada)//monstrar a interface para o usuario:
           break

            case '8': // Buscando Anuncio:  
                var titulo = requisicao.question('Título do anúncio: ') 
                
                // vincular a lista do anuncio encontrado
                anuncioEncontrado = Anuncio.adicionarAnuncios(nome)

                if( anuncioEncontrado === -1 ){// se não encontrar comrrespondente devolve -1 
                    console.error('O anúncio não foi encontrado!')
                }
                //Interface que será mostrada para o usuário:

                anuncioEncontrado = `
                Anúncio encontrado com sucesso!
                Título = ${hospedeEncontrado.titulo}
                Descricao = ${hospedeEncontrado.descricao}
                Status = ${hospedeEncontrado.status} 

                `
                console.log(anuncioEncontrado) // mostrar a interface para o usuário
            break

            case '9': // Editando Hospede: 
            // Buscar no banco de dados o hóspede que desejamos editar
            var nome = requisicao.question('Nome: ') 
            hospedeEmEdicao = Hospede.buscarHospedesPorNome(nome)
        
            //verificando se o hospede existe:
            if (hospedeEmEdicao === -1 ){ // se não achar hóspede com nome correspondente devolve -1 
                console.error('Hospede nao encontrado!')
            }

            // Definindo as novas informacoes
            novoNome = requisicao.question('Novo nome: ')
            novoEndereco = requisicao.question('Novo endereço: ')

            Hospede.atualizarHospedes(novoNome,novoEndereco)


            break
    
            case '10': // Editando Propriedade:
                //Buscando no banco de dados a propriedade que vai ser editada:
                var nome = requisicao.question('Nome da pousada: ') 
                propriedadeEmEdicao = Propriedade.buscarPropriedadesPorNome(nome)
                console.log(propriedadeEmEdicao)

                //verificando se o hospede existe:
                if (hospedeEmEdicao === -1 ){ // se não achar hóspede com nome correspondente devolve -1 
                console.error('Hospede nao encontrado!')
                }

                //Definindo novas informações:
                novoNome = requisicao.question('Novo nome: ')
                novoEndereco = requisicao.question('Novo endereço: ')
                novaCapacidade = requisicao.question('Nova capacidade de hóspedes:')
                novoQuarto = requisicao.question('Novo número de quartos: ')
                novoPreco = requisicao.question('Novo preço por noite:')
                novaDisponibilidade = requisicao.question('Nova disponibilidade')

                Propriedade.atualizarPropriedades(novoNome, novoEndereco, novaCapacidade, novoQuarto, novoPreco, novaDisponibilidade)
            break
    
            case '11': // Editando Reserva: 
                //Buscando no banco de dados da reserva que vai ser editada:
                var nome = requisicao.question('Nome da reserva: ') 
                reservaEmEdicao = Reserva.buscarReservasPorNome(nome)
                console.log(reservaEmEdicao)

                //verificando se a reserva existe:
                if (reservaEmEdicao === -1 ){ // se não achar reserva com nome correspondente devolve -1 
                console.error('Reserva não encontrada!')
                }

                //Definindo novas informações:
                novoNomeHospede = requisicao.question('Novo nome: ')
                novoCheckin = requisicao.question('Nova data de checkin: ')
                novoCheckout = requisicao.question('Nova data de checkout: ')

                Reserva.atualizarReservas(novoNomeHospede, novoCheckin, novoCheckout)
            break

            case '12': // Editando Anuncio:
                // Buscando anuncio que será indicado: ERRO ID
                var titulo = requisicao.question('Título do anúncio: ') 
                
                // vincular a lista do anuncio encontrado
                anuncioEncontrado = Anuncio.adicionarAnuncios(nome)

                if( anuncioEncontrado === -1 ){// se não encontrar comrrespondente devolve -1 
                    console.error('O anúncio não foi encontrado!')
                }
                //Registrando as novas informções:

                var novoTitulo = requisicao.question('Novo título:')
                var novaDescricao = requisicao.question('Nova descrição:')
                var novoStatus = requisicao.question('Novo status:')

                Anuncio.atualizarAnuncios(novoTitulo, novaDescricao, novoStatus)
            
            break
            case '13': // Excluindo Hospede: 
                // Buscando Hospede que será excluido:
                var nome = requisicao.question('Nome: ') 
                
                // vinculando a lista do hospede encontrado pela funcao buscar
                hospedeEncontrado = Hospede.buscarHospedesPorNome(nome) 
                
                if (hospedeEncontrado === -1 ){ // se não achar hóspede com nome correspondente devolve -1 
                    console.error('Hospede nao encontrado!')
                }
                 
                //Removendo o hóspede:
                Hospede.removerHospedes(hospedeEncontrado)

                break
    
            case '14': // Excluindo Propriedade: 
                // Buscando Propriedade: 
                var nome = requisicao.question('Nome: ') 
                
                // Vinculando a lista da propriedade encontrada pela funcao buscar 
                propriedadeEncontrada = Propriedade.buscarPropriedadesPorNome(nome) 

                if (propriedadeEncontrada === -1 ) { //se não achar propriedade com nome correspondente devolve -1
                    console.error('Propriedade não encontrada!')
                }
                console.log('propriedadeEncontrada', propriedadeEncontrada)
                 
             
                Propriedade.removerPropriedades(propriedadeEncontrada.id)
                
                break
    
            case '15': // Excluindo Reserva: 
                // Buscando Reserva: 
                var nomeHospede = requisicao.question('Nome do hóspede: ') 
                
                //vincular a lista de reserva encontrada pela funcao buscar
                reservaEncontrada = Reserva.buscarReservasPorNome(nomeHospede)

                if (reservaEncontrada === -1){// se não achar correspondente devolve -1
                    console.error('Nenhuma reserva encontrada!')
                }
 
                
                Reserva.removerReservas(reservaEncontrada.id)
                
                break
    
            case '16': // Excluindo Anuncio: 
                // Buscando Anuncio: ERRO ID
                var titulo = requisicao.question('Título do anúncio: ') 
                
                // vincular a lista do anuncio encontrado
                anuncioEncontrado = Anuncio.adicionarAnuncios(nome)

                if( anuncioEncontrado === -1 ){// se não encontrar comrrespondente devolve -1 
                    console.error('O anúncio não foi encontrado!')
                }
                
                Anuncio.atualizarAnuncios(anuncioEncontrado.id)
                
                break   
        }
    }
} else if(respostaLogin === '2'){ // Realizar cadastro do funcionario FUNCIONANDO SEM GERAR ID
    var senha = requisicao.question('Senha: ')
    var nome = requisicao.question('Nome: ')
    var endereco = requisicao.question('Endereço: ')
    var email = requisicao.question('Email: ')

    Usuario.adicionarUsuarios(senha, nome, endereco, email)


    


}



