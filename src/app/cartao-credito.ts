export class CartaoCredito {
        constructor(
        public id: number,
        public idusuario: number,
        public validadeCartao: string,
        public nomeUsurioCartao: string,
        public numeroCartao: string,
        public codigoSeguranca: number
        ) {  }
}
