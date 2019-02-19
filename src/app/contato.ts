export class Contato {
    constructor (
        public id: string,
        public cadastradoPor: number,
        public idUsuarioContato: number,
        public nomeContato: string,
        public numeroConta: number,
    ) {}
}
