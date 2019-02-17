export class CartaoCredito {
        constructor(
        public id: number,
        public idUsuario: number,
        public validadeCartao: string,
        public nomeUsuarioCartao: string,
        public numeroCartao: string,
        public codigoSeguranca: number
        ) {  }
}
