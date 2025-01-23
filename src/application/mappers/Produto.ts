export default interface Produto {
    id: string;
    unidade: string;
    marca: string;
    gtin: string;
    codigo: string;
    ncm: string;
    nome: string;
    descricao: string;
    descricaoPDV: string;
    valorCompra: number;
    valorVenda: number;
    precoVendaMinimo: number;
    precoLucroZero: number;
    precoLocroMinimo: number;
    precoLucroMaximo: number;
    quantidadeEstoque: number;
    quantidadeEstoqueAnterior: number;
    estoqueMinimo: number;
    estoqueMaximo: number;
    estoqueIdeal: number;
    excluido: string;
    inativo: string;
    foto: string;
    iat: string;
    ibpt: string;
    itemSped: string;
}