const fs = require('node:fs');

class Reserva {
    constructor(id, idPropriedade, idHospede, nomeHospede, checkin, checkout){
        this.id = id
        this.idPropriedade = idPropriedade
        this.idHospede = idHospede
        this.nomeHospede = nomeHospede
        this.checkin = checkin
        this.checkout = checkout
    }
}

class ReservaFuncoes{
    constructor(filePath) {
        this.filePath = filePath;
        this.reservas = this.lerReservas()
    }

    lerReservas() {
        try {
            const reservaJSON = fs.readFileSync(this.filePath,'utf-8');
            return JSON.parse(reservaJSON);
        } catch (error) {
            return[]
        }
    }

    salvarReservas(){
        const reservaJSON = JSON.stringify(this.reservas, null , 2 );
        fs.writeFileSync(this.filePath, reservaJSON, 'utf-8')
    }

    adicionarReservas(idPropriedade, idHospede, checkin, checkout ) {
        const id = this.identificarUltimoIdReservas() + 1;
        const novaReserva = new Reserva(id, idPropriedade, idHospede, nomeHospede, checkin, checkout);
        this.reservas.push(novaReserva);
        this.salvarReservas();
        console('Reserva cadastrada com sucesso!')
    }

    listarReservas(){
        console.log('Lista de reservas:');
        this.reservas.forEach( reserva => {
            console.log(
                `
                ID = ${reserva.id},
                idPropriedade = ${reserva.idPropriedade},
                idHospede = ${reserva.idHospede},
                nomeHospede = ${reserva.nomeHospede}
                checkin = ${reserva.checkin}
                checkout = ${reserva.checkout}
            
                `
            )
        })
    }   

    buscarReservasPorNome(nomeHospede){
        return this.reservas.find (reserva => reserva.nomeHospede === nomeHospede);
    }

    atualizarReservas(novoNomeHospede, novoCheckin, novoCheckout ){
        const reservaIndex = this.reservas.findIndex( reserva => reserva.id === id );

        if (reservaIndex  !== -1) {
        reservas[hospedes.Index].nomeHospede = novoNomeHospede        
        reservas[hospedes.Index].checkinheckin = novoCheckin
        reservas[hospedes.Index].checkout = novoCheckout
        reservas();
            console.log('Propriedade atualizada com sucesso!')
        } else {
            console.log('Propriedade não encontrada!')
            }
    }

    removerReservas(id){
        this.reservas = this.reservas.filter( reserva => reserva.id !== id) ;
        this.salvarReservas();
        console.log('Reserva removida com sucesso!')
    }

    identificarUltimoIdReservas(){
        let ultimoId = this.reservas[this.reservas.length-1]?.id

        if(!ultimoId){
            ultimoId = 0 
        }
        return ultimoId ;
    }


}


const reservaJSON = new ReservaFuncoes('database/reserva.json');

module.exports = reservaJSON
