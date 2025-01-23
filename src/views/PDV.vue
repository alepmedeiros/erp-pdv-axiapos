<template>
  <div class="pos-container">
    <ProductDisplay :productName="currentProductName" />

    <div class="pos-content">
      <ProductInput
        :productCode="productCode"
        :quantity="quantity"
        :unitario="unitario"
        :total="total"
        @cancelarVenda="cancelarVenda"
        @limpaItens="limpaItens"
        @imprimirCupom="imprimirCupom"
        @abrirModalPagamento="abrirModalPagamento"
        @buscarProduto="buscarProduto"
        @adicionarProduto="adicionarProduto"
        @limpaCampos="limparCampos"
      />
      
      <ProductList 
        :items="items" 
        @remove="removeItem"
        />
    </div>
    <PaymentModal
        v-if="isModalVisible"
        :open="isModalVisible"
        @close="fecharModalPagamento"
        @payment-success="handlePaymentSuccess"
        @payment-error="handlePaymentError"
      />
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductInput from '@/components/ProductInput.vue';
import ProductList from '@/components/ProductList.vue';
import ProductDisplay from '@/components/ProductDisplay.vue';
import { getProductByCode } from '@/service/productService';
import type { Item } from '@/types/items';
import type { Venda } from '@/types/Venda';
import type { ItensVenda } from '@/types/ItensVenda';
import { finalizarVenda as enviarVenda } from '@/service/vendaService';
import PaymentModal from '@/components/PaymentModal.vue';

const productCode = ref<string>('');
const productID = ref<string>('');
const quantity = ref<number>(1);
const unitario = ref<number>(0);
const total = ref<number>(0);
const items = ref<Item[]>([]);
const currentProductName = ref(''); // Nome inicial do produto
const isModalVisible = ref(false);

// Função para abrir o modal de pagamento
const abrirModalPagamento = () => {
  if (items.value.length === 0) {
    alert('Adicione itens antes de finalizar a venda.');
    return;
  }
  isModalVisible.value = true;
};

const handlePaymentSuccess = () => {
  console.log('Evento payment-success recebido no PDV.');
  fecharVenda();
};

// Fechar o modal de pagamento
const fecharModalPagamento = () => {
  isModalVisible.value = false;
};

// Funções auxiliares para cálculo e limpeza
const calcularTotal = () =>
  items.value.reduce((acc, item) => acc + item.total, 0);

const calcularSubtotal = () =>
  items.value.reduce((acc, item) => acc + item.value * item.quantity, 0);

const fecharVenda = async () => {
  try {    
    const venda: Venda = {
      total: calculaTotal(),
      subtotal: calcularSubtotal(),
      formaPagamento: '0', // Exemplo de forma de pagamento
      situacao: 'F', // Finalizada
      itens: items.value.map((item): ItensVenda => ({
        id: '', // Ignorado no envio
        produto: item.id, // Certifique-se de que o código está sendo preenchido
        quantidade: item.quantity,
        valorUnitario: item.value,
        subTotal: item.value * item.quantity,
        desconto: 0,
        total: item.total,
        comissao: 0,
        valorComissao: 0,
      })),
    };

    console.log(venda);
    
    const response = await enviarVenda(venda);

    tratarImpressao(response);

    limparCampos();
    items.value = [];
    fecharModalPagamento();
  } catch (error) {
    console.error('Erro ao emitir cupom:', error);
    alert('Erro ao finalizar a venda. Verifique os dados e tente novamente.');
  }
};

// Manipular erros de pagamento
const handlePaymentError = (error: any) => {
  console.error('Erro no pagamento:', error);
  alert('Erro ao processar o pagamento. Tente novamente.');
  fecharModalPagamento();
};

const tratarImpressao = (data: ArrayBuffer) => {
  console.log('Tamanho do ArrayBuffer recebido:', data.byteLength);
  if (data.byteLength === 0) {
    console.error('ArrayBuffer vazio, nada para processar.');
    return;
  }

  const comportamentoPadrao = import.meta.env.VITE_IMPRESSAO_PADRAO || 'visualizar';

  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  if (comportamentoPadrao === 'visualizar') {
    window.open(url, '_blank');
  } else if (comportamentoPadrao === 'imprimir') {
    const novaJanela = window.open(url, '_blank');
    if (novaJanela) {
      novaJanela.focus();
      novaJanela.onload = () => novaJanela.print();
    }
  } else {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cupom.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


const calculaTotal = () => {
  const subtotal = calcularSubtotal();
  const descontos = 0;
  return subtotal - descontos;
};

const buscarProduto = async (codigo: string) => {
  if (!codigo) return

  productCode.value = codigo;
  try {
    const response = await getProductByCode(codigo);

    const produto = Array.isArray(response.data) ? response.data[0] : response.data; 

    productID.value = produto.id || '';
    currentProductName.value = produto.descricao || 'Produto não encontrado';
    unitario.value = produto.valorVenda || 0;
    total.value = unitario.value * quantity.value;   

  } catch (error) {
    console.error('Erro ao buscar o produto:',error);
  }
}

// Função para adicionar o produto à lista de itens
const adicionarProduto = () => {
  if (!productCode.value) {
    return;
  }

  const item: Item = {
    id: productID.value,
    codigo: productCode.value,
    description: currentProductName.value,
    quantity: quantity.value,
    value: unitario.value,
    total: unitario.value * quantity.value,
  };

  items.value.push(item);
  atualizarTotais();
  limparCampos(); // Apenas limpa os campos do input, não o array de items.
};


const limparCampos = () => {
  currentProductName.value = '';
  productCode.value = '';
  quantity.value = 1;
  unitario.value = 0;
  total.value = 0;
};



// Função para atualizar os totais após adicionar um item
const atualizarTotais = () => {
  total.value = items.value.reduce((acc, item) => acc + item.total, 0);
};

// Defina as funções de manipulação para os eventos
const cancelarVenda = () => {
  console.log('Venda cancelada');
};

const limpaItens = () => {
  console.log('Itens limpos');
};

const imprimirCupom = () => {
  console.log('Impressão do cupom iniciada');
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
  atualizarTotais();
};
</script>

<style scoped>
.pos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px; /* Ajuste o padding top para 60px para compensar a navbar fixa */
}

.pos-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top : 20px;
}
</style>