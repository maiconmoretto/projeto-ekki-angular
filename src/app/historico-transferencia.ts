export class HistoricoTransferencia {
    constructor (
        public id: number,
        public idUsuario: number,
        public idDestinatario: number,
        public dataCadastro: Date,
        public valor: string,
        public nomeDestinatario: string,
        public numeroConta: string,
        public numeroCartao: string
    ){}
}
