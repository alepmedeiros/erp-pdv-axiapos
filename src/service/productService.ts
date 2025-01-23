import apiClient from './api';


export const getProductByCode = async (codigo: string) => {
  try {
    const response = await apiClient.get(`/produtos/${codigo}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar produto: ', error);
    throw error;
  }
};

export const createProduct = async (product: {
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
}) => {
  try {
    const response = await apiClient.post('/produtos', product);    
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    throw error;
  }
};
