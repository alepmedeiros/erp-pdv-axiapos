<template>
  <div>
    <h2 class="title">Pagamento do MercadoPago!</h2>
    <div id="cardpaymentBrick_container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits } from 'vue';
import { initializeMercadoPagoBrick, processPayment } from '@/service/mercadoPagoService';

// Define o evento que será emitido após a confirmação do pagamento
const emit = defineEmits<{
  (e: 'payment-success'): void;
  (e: 'payment-error', error: any): void;
}>();

onMounted(() => {
  const settings = {
    initialization: {
      amount: 100, // valor total a ser pago
    },
    customization: {
      visual: {
        style: {
          theme: 'default',
        },
      },
      paymentMethods: {
        creditCard: 'all',
        debitCard: 'all',
        bankTransfer: ['pix'],
      },
    },
    callbacks: {
      onReady: () => {
        console.log('Brick pronto para uso.');
      },
      onSubmit: async (formData: any) => {
        try {
          console.log('Dados do formData:', formData);

          // Acessa os dados dentro de formData.formData
          const paymentData = formData.formData;

          // Validação para garantir que paymentData tenha as propriedades necessárias
          if (!paymentData || !paymentData.payer || !paymentData.payer.email) {
            throw new Error('Dados de pagamento incompletos ou inválidos.');
          }

          // Reformata os dados recebidos para o modelo esperado
          const formattedData = {
            transaction_amount: paymentData.transaction_amount || 0,
            token: paymentData.token || '',
            description: 'Compra no PDV',
            installments: paymentData.installments || 1,
            payment_method_id: paymentData.payment_method_id || '',
            issuer_id: parseInt(paymentData.issuer_id || '0', 10),
            payer: {
              email: paymentData.payer.email || '',
              identification: {
                type: paymentData.payer.identification?.type || '',
                number: paymentData.payer.identification?.number || '',
              },
            },
          };

          // Envia os dados formatados para o backend
          const response = await processPayment(formattedData);
          // console.log('Pagamento processado com sucesso:', response);
          // Emitir evento de sucesso
          emit('payment-success');
          console.log('Evento payment-success emitido.');
          // Adicione lógica adicional se necessário
          //alert('Pagamento realizado com sucesso!');
          
        } catch (error) {
          console.error('Erro ao processar pagamento:', error);
          alert('Erro ao processar o pagamento. Tente novamente.');
          // Emitir evento de erro
          emit('payment-error', error);
        }
      },
      onError: (error: any) => {
        console.error('Erro no Brick do MercadoPago:', error);
        // Emitir evento de erro
        emit('payment-error', error);
      },
    },
  };

  const containerId = 'cardpaymentBrick_container';
  initializeMercadoPagoBrick(containerId, settings);
});
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>