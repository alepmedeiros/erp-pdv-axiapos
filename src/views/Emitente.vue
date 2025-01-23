<template>
  <div class="emitente-container">
    <div class="header">
      <button class="back-button" @click="goBack">← VOLTAR</button>
      <h2>INSERIR EMITENTE</h2>
    </div>

    <form @submit.prevent="submitForm" class="emitente-form">
      <!-- Dados Principais -->
      <section>
        <h3>Dados Principais</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="nome">*Razão Social</label>
            <input v-model="formData.nome" id="nome" type="text" required placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="nome">Fantasia</label>
            <input v-model="formData.fantasia" id="nome" type="text" required placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="cnpj">CNPJ</label>
            <input v-model="formData.cnpj" id="cnpj" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="inscricaoEstadual">Inscrição Estadual</label>
            <input v-model="formData.inscricaoEstadual" id="inscricaoEstadual" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="inscricaoMunicipal">Inscrição Municipal</label>
            <input v-model="formData.inscricaoMunicipal" id="inscricaoMunicipal" type="text" placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input v-model="formData.telefone" id="telefone" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="celular">Celular/Whatsapp</label>
            <input v-model="formData.celular" id="celular" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input v-model="formData.email" id="email" type="email" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="emailContabilidade">E-mail Contabilidade</label>
            <input v-model="formData.emailContabilidade" id="emailContabilidade" type="email" placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="crt">CRT</label>
            <input v-model="formData.crt" id="crt" type="number" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="regime">Regime</label>
            <input v-model="formData.regime" id="regime" type="number" placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="logotipo">Logotipo</label>
            <!-- Custom file input -->
            <div class="file-upload-wrapper">
              <button type="button" class="upload-btn" @click="triggerFileInput">Selecionar Logotipo</button>
              <span class="file-name">{{ fileName }}</span>
              <input id="logotipo" type="file" @change="handleLogoUpload" ref="fileInput" class="hidden-input" />
            </div>
          </div>
        </div>
      </section>

      <!-- Endereço -->
      <section>
        <h3>Endereço</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="cep">CEP</label>
            <input v-model="formData.endereco.cep" id="cep" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="logradouro">Logradouro</label>
            <input v-model="formData.endereco.logradouro" id="logradouro" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="numero">Número</label>
            <input v-model="formData.endereco.numero" id="numero" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="bairro">Bairro</label>
            <input v-model="formData.endereco.bairro" id="bairro" type="text" placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="complemento">Complemento</label>
            <input v-model="formData.endereco.complemento" id="complemento" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="cidade">Cidade</label>
            <input v-model="formData.endereco.cidade" id="cidade" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <input v-model="formData.endereco.estado" id="estado" type="text" placeholder="Digite aqui..." />
          </div>
        </div>
      </section>

      <!-- CNAE -->
      <section>
        <h3>CNAE</h3>
        <div v-for="(cnae, index) in formData.cnae" :key="index" class="form-row cnae-row">
          <div class="form-group">
            <label for="principal">Principal</label>
            <select v-model="cnae.principal">
              <option value="S">Sim</option>
              <option value="N">Não</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ramoAtividade">Ramo de Atividade</label>
            <input v-model="cnae.ramoAtividade" type="text" placeholder="Digite o ramo de atividade..." />
          </div>
          <div class="form-group">
            <label for="objetivoSocial">Objetivo Social</label>
            <input v-model="cnae.objetivoSocial" type="text" placeholder="Digite o objetivo social..." />
          </div>
          <button @click.prevent="removeCNAE(index)" class="remove-button">✖</button>
        </div>
        <button @click.prevent="addCNAE" class="add-button">Adicionar CNAE</button>
      </section>

      <!-- Emissor Fiscal -->
      <section>
        <h3>Emissor Fiscal</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="tipoDocumento">Tipo de Documento</label>
            <input v-model="formData.emissorFiscal.tipoDocumento" id="tipoDocumento" type="text" placeholder="NFC-e, etc..." />
          </div>
          <div class="form-group">
            <label for="tipoDocumento">Tipo de Emissão</label>
            <input v-model="formData.emissorFiscal.tipoEmissao" id="tipoEmissao" type="text" placeholder="Normal, etc..." />
          </div>
          <div class="form-group">
            <label for="ambiente">Tipo SPED</label>
            <input v-model="formData.emissorFiscal.tipoSped" id="tipoSped" type="number" placeholder="1 = Fiscal" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="ambiente">Ambiente</label>
            <input v-model="formData.emissorFiscal.ambiente" id="ambiente" type="number" placeholder="2 = Homologação" />
          </div>
          <div class="form-group">
            <label for="serie">Série</label>
            <input v-model="formData.emissorFiscal.serie" id="serie" type="text" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="numero">Número</label>
            <input v-model="formData.emissorFiscal.numero" id="numero" type="number" placeholder="Digite aqui..." />
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input v-model="formData.emissorFiscal.senha" id="senha" type="password" placeholder="Digite aqui..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="certificadoDigital">Certificado Digital</label>
            <!-- Custom file input -->
            <div class="file-upload-wrapper">
              <button type="button" class="upload-btn" @click="triggerCertificadoInput">Selecionar Certificado</button>
              <span class="file-name">{{ certFileName }}</span>
              <input id="certificadoDigital" type="file" @change="handleCertificadoUpload" ref="certInput" accept=".pfx,.cer,.p12,.p7" class="hidden-input" />
            </div>
          </div>
        </div>
      </section>

      <div class="form-actions">
        <button type="submit" class="submit-button">Salvar</button>
      </div>
    </form>

    <!-- Exibir notificações -->
    <transition-group name="notification" tag="div">
      <notification
        v-for="(notification, index) in notifications"
        :key="index"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        @close="removeNotification(index)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import Notification from '@/components/Notification.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Função para converter ArrayBuffer em Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const notifications = ref<Array<{ type: string, title: string, message: string }>>([]); // Notificações
const router = useRouter();

// Dados iniciais do formulário, adaptados ao JSON
const formData = ref({
  nome: '',
  fantasia: '',
  cnpj: '',
  telefone: '',
  celular: '',
  email: '',
  emailContabilidade: '',
  inscricaoEstadual: '',
  inscricaoMunicipal: '',
  crt: null,
  logotipo: '',
  regime: null,
  endereco: {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  },
  cnae: [], // Caso necessário, incluir mais campos no formulário
  emissorFiscal: {
    tipoDocumento: '',
    ambiente: null,
    serie: '',
    numero: null,
    tipoEmissao: '',
    tipoSped: '',
    senha: '',
    certificado: ''
  }
});

// Função para exibir notificações
const showNotification = (type: string, title: string, message: string) => {
  console.log(type,title,message);
  
  notifications.value.push({ type, title, message });
};

// Função para remover notificações
const removeNotification = (index: number) => {
  notifications.value.splice(index, 1);
};

// Estado para armazenar o nome do arquivo do certificado digital
const certFileName = ref('Nenhum certificado selecionado');

// Função para abrir o seletor de arquivo do certificado digital
const triggerCertificadoInput = () => {
  const input = document.getElementById('certificadoDigital') as HTMLInputElement;
  input?.click();
};

// Função para processar o upload do certificado digital
const handleCertificadoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    certFileName.value = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      formData.value.emissorFiscal.certificado = arrayBufferToBase64(arrayBuffer);
    };
    reader.readAsArrayBuffer(file); // Salva o certificado como string base64
  }
};

// Função para adicionar CNAE
const addCNAE = () => {
  formData.value.cnae.push({ principal: 'N', ramoAtividade: '', objetivoSocial: '' });
};

// Função para remover CNAE
const removeCNAE = (index: number) => {
  formData.value.cnae.splice(index, 1);
};

// Função para voltar
const goBack = () => {
  router.back();
};

// Estado para armazenar o nome do arquivo selecionado
const fileName = ref('Nenhum ficheiro selecionado');

// Função para abrir o seletor de arquivo
const triggerFileInput = () => {
  const input = document.getElementById('logotipo') as HTMLInputElement;
  input?.click();
};

// Função para processar o upload do logotipo
const handleLogoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    fileName.value = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      formData.value.logotipo = reader.result as string;
    };
    reader.readAsDataURL(file); // Salva a imagem como base64
  }
};

// Função para enviar o formulário e criar o JSON
const submitForm = () => {
  console.log('JSON Gerado:', JSON.stringify(formData.value, null, 2));
  // Simulação de sucesso
  showNotification('success', 'Sucesso', 'Emitente salvo com sucesso!');
  // Adicionar lógica de envio de dados para API aqui
};
</script>

<style scoped>
.emitente-container {
  padding: 20px;
  background-color: #f4f4f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #a049b8;
  padding: 10px;
  color: white;
  border-top-left-radius: 8px;  /* Arredonda o canto superior esquerdo */
  border-top-right-radius: 8px; /* Arredonda o canto superior direito */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-button {
  background-color: #fff;
  color: #a049b8;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

h2 {
  margin: 0;
}

section {
  margin-bottom: 35px;
}

.emitente-form {
  background-color: #fff;
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: #5c6e74; /* Cor do texto */
  border-bottom: 1px solid #ccc; /* Linha inferior */
  padding-bottom: 5px; /* Espaçamento entre o texto e a linha */
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px; /* Espaçamento entre linhas */
  padding-right: 20px; /*verificar a possibilidade de retirar*/
}

.form-group {
  flex: 1;
  margin-right: 20px; /*verificar a possibilidade de retirar*/ 
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #a049b8;
  box-shadow: 0 0 8px rgba(160, 73, 184, 0.2);
  outline: none;
}

/* Estilo dos botões de adicionar e remover CNAE */
.cnae-row {
  align-items: center;
}

.add-button {
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #218838;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  margin-left: 10px;
  margin-top: 22px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c82333;
}

.file-upload-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-btn {
  background-color: #3a82f7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.file-name {
  font-style: italic;
  color: #666;
}

.hidden-input {
  display: none;
}

.form-group:last-child {
  margin-right: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-actions {
  text-align: right;
}

.submit-button {
  background-color: #3a82f7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.notification-enter-from, .notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
