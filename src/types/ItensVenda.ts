export interface ItensVenda {
    id: string;
    produto: string;
    quantidade: number;
    valorUnitario: number;
    subTotal: number;
    desconto: number;
    total: number;
    comissao: number;
    valorComissao: number;
}