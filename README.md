# Sistema ERP/PDV Privado - i9up

Este é um projeto **privado** desenvolvido para a i9up. O sistema tem como objetivo oferecer uma solução integrada de **ERP e PDV** para atender às demandas de gestão e operações da empresa, utilizando práticas modernas de desenvolvimento de software. O acesso ao sistema será controlado por permissões de login, garantindo que cada usuário tenha acesso apenas às funcionalidades designadas (ERP ou PDV).

---

## 📋 Objetivo do Projeto

Desenvolver um sistema escalável e modular para:
- **ERP**: Gerenciamento de empresas, produtos, estoques, usuários e relatórios.
- **PDV**: Registro de vendas, integração com dispositivos fiscais e relatórios de transações.

O projeto é baseado em **Clean Architecture**, **Domain-Driven Design (DDD)** e **Test-Driven Development (TDD)**, garantindo alta qualidade no código e facilidade de manutenção.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **Vue 3**: Framework moderno para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e escalabilidade.
- **PrimeVue**: Biblioteca de componentes para interfaces funcionais e rápidas.
- **SCSS**: Estilização modular e customizável.
- **Vite**: Ferramenta para build rápido e eficiente.
- **Vitest**: Framework de testes para desenvolvimento orientado a testes (TDD).
- **Pinia**: Gerenciamento de estado centralizado.
- **Clean Architecture**: Para separação clara de responsabilidades.

### **Backend**
- **Java (Sping Boot)**: Todo o processo será usado com ele, desde os cadastros mais basicos, até as autenticações.
- **Delphi**: Será usado neste primeiro momento para as emissões fiscais.

### **Integrações**
- **Impressoras**: Para impressão dos documentos fiscais(NFC-e), e em caso de NF-e impressoras normais.
- **Periféricos**: Serão homologados com base na necessidade, como balança, e demais periféricos.
- **Apps Delivery**: Integrações completas com os principais apps de delivery do mercado.
- **Marketplaces**: Todos os principais do mercado.
- **IA**: Para suporte e gerações de relatórios dinamicos, com base na necessidade do cliente dentro do chat.
---

## 📂 Estrutura do Projeto ERP

O projeto segue os princípios de **Clean Architecture**, dividido em camadas bem definidas:

```plaintext
src/
├── core/               # Camada de domínio (entidades e casos de uso)
│   ├── entities/       # Entidades principais (ex.: Produto, Venda)
│   ├── usecases/       # Casos de uso do domínio
│   └── repositories/   # Interfaces para os repositórios
├── infrastructure/     # Camada de infraestrutura
│   ├── api/            # Comunicação com APIs externas (ex.: Delphi)
│   ├── persistence/    # Implementações concretas dos repositórios
│   └── config/         # Configurações gerais de infraestrutura
├── application/        # Casos de uso e lógica de aplicação
│   ├── services/       # Serviços intermediários da aplicação
│   └── mappers/        # Mapeamento entre camadas
├── presentation/       # Camada de apresentação
│   ├── components/     # Componentes Vue reutilizáveis
│   ├── pages/          # Páginas completas (ERP e PDV, renderizadas por permissões)
│   ├── router/         # Configuração de rotas e controle de acesso
│   └── store/          # Gerenciamento de estado (ex.: Pinia)
├── tests/              # Testes unitários e de integração
└── assets/             # Arquivos estáticos (imagens, CSS, fontes)
├── App.vue                   # Componente raiz
└── main.ts  
```

---

## 🛠️ Configuração e Instalação

### **1. Pré-requisitos**
- **Node.js** versão 18.x ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### **2. Configuração do Projeto**
1. Clone o repositório:
   ```bash
   git clone https://git.empresa.com.br/erp-pdv-axiapos.git
   cd erp-pdv-axiapos  
2. Instale as dependências:
   ```bash
   npm install
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
4. Execute os testes:
   ```bash
   npm run test
### 📝 **Instruções Internas**
### Ambiente de Desenvolvimento
1. Utilize o branch principal `main` para versões estáveis.
2. Para novas funcionalidades, crie branches específicas:
  ```bash
  git checkout -b feature/nome-da-feature
  ```
### Padrões de Código
- Seguir os princípios de Clean Architecture.
- Priorizar TDD e garantir cobertura de testes para cada caso de uso.
- Manter o código limpo e seguir as práticas de codificação definidas internamente.
### Ambiente de Produção
O ambiente de produção está configurado no servidor interno da empresa. Para realizar deploy:

1. Certifique-se de que o branch `main` está atualizado.
2. Use o pipeline de CI/CD configurado no repositório privado.

### 🧪 Testes
### Cobertura de Testes
- Todos os casos de uso e regras de negócio devem ser cobertos por testes unitários.
- Utilize o comando abaixo para rodar os testes:
  ```bash
  npm run test:unit       # Executa testes unitários
  npm run test:integration # Executa testes de integração
  npm run test:coverage   # Gera relatório de cobertura
  ````

### 📅 *Planejamento do Projeto*
### Fases do Desenvolvimento
1. *Fase 1*: Configuração inicial e arquitetura básica (Clean Architecture e PrimeVue).
2. *Fase 2*: Implementação de funcionalidades ERP (cadastro, estoque, relatórios).
3. *Fase 3*: Desenvolvimento do módulo PDV.
4. *Fase 4*: Integrações e ajustes finais.
5. *Fase 5*: Implementação de controle de acesso com base em permissões de login.

### 📖 *Documentação Interna*
Toda a documentação detalhada está disponível no diretório:
[docs](docs/).

Inclui:

- *Casos de Uso*
- *Diagrama de Arquitetura*
- *Configuração do Ambiente*
- *Manuais de Instalação*

### 📞 *Contato*
Para dúvidas ou suporte interno, entre em contato:

*Equipe de Desenvolvimento*: devs@i9up.com.br
*Gestor do Projeto*: gestor@i9up.com.br
