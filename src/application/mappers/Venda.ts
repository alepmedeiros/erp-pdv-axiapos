import type { ItensVenda } from "./ItensVenda";

export interface Venda {
	id: string;
	cliente: string;
	total: number;
	subtotal: number;
	comissao: number;
	valorComissao: number;
	desconto: number;
	valorDesconto: number;
	formaPagamento: string;
	situacao: string;
	itens: ItensVenda[];
}