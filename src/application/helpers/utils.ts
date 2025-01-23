// utils.ts
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatDecimal = (value: number): string => {
  return value.toFixed(2);
};  