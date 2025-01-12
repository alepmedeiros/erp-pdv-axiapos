# Sistema ERP/PDV Privado - i9up

Este é um projeto **privado** desenvolvido para i9up. O sistema tem como objetivo oferecer uma solução integrada de **ERP e PDV** para atender às demandas de gestão e operações da empresa, utilizando práticas modernas de desenvolvimento de software.

---

## 📋 Objetivo do Projeto

Desenvolver um sistema escalável e modular para:
- **ERP**: Gerenciamento de empresas, produtos, estoques, usuários e relatórios.
- **PDV**: Registro de vendas, integração com dispositivos fiscais e relatórios de transações.

O projeto é baseado em **Clean Architecture**, **Domain-Driven Design (DDD)** e **Test-Driven Development (TDD)**, garantindo alta qualidade no código e facilidade de manutenção.

---

## 🚀 Tecnologias Utilizadas

- **Vue 3**: Framework moderno para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e escalabilidade.
- **PrimeVue**: Biblioteca de componentes para interfaces funcionais e rápidas.
- **SCSS**: Estilização modular e customizável.
- **Vite**: Ferramenta para build rápido e eficiente.
- **Vitest**: Framework de testes para desenvolvimento orientado a testes (TDD).
- **Pinia**: Gerenciamento de estado centralizado.
- **Clean Architecture**: Para separação clara de responsabilidades.

---

## 📂 Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture**, dividido em camadas bem definidas:

```plaintext
src/
├── domain/                   # Camada de domínio
│   ├── entities/             # Entidades do negócio
│   │   └── User.ts           # Exemplo de entidade
│   ├── value-objects/        # Objetos de valor
│   ├── repositories/         # Interfaces de repositórios
│   │   └── UserRepository.ts # Exemplo de contrato
│   └── services/             # Lógica de domínio
│
├── application/              # Casos de uso e serviços de aplicação
│   ├── use-cases/            # Casos de uso
│   │   └── CreateUser.ts     # Exemplo de caso de uso
│   └── dto/                  # Objetos de transferência de dados
│       └── UserDTO.ts        # Exemplo de DTO
│
├── infrastructure/           # Implementações técnicas
│   ├── persistence/          # Repositórios concretos
│   │   └── UserRepositoryImpl.ts
│   ├── api/                  # Chamadas a APIs externas
│   │   └── HttpClient.ts     # Configuração de cliente HTTP
│   └── config/               # Configurações gerais
│
├── presentation/             # Interface com o usuário
│   ├── components/           # Componentes reutilizáveis
│   │   └── Sidebar.vue
│   ├── layouts/              # Layouts principais
│   │   └── MainLayout.vue
│   ├── pages/                # Páginas principais
│   │   └── Dashboard.vue
│   ├── router/               # Configuração de rotas
│   │   └── index.ts
│   └── store/                # Gerenciamento de estado (Pinia)
│       └── userStore.ts
│
├── tests/                    # Testes unitários e de integração
│   ├── unit/
│   │   └── domain/
│   │       └── CreateUser.spec.ts
│   ├── integration/
│   └── utils/                # Utilitários de teste
│
├── assets/                   # Arquivos estáticos
│   └── styles/
│       └── tailwind.css      # Estilos base do Tailwind
├── App.vue                   # Componente raiz
└── main.ts                   # Ponto de entrada principal
```

---

## 🛠️ Configuração e Instalação

### **1. Pré-requisitos**
- **Node.js** versão 18.x ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### **2. Configuração do Projeto**
1. Clone o repositório:
   ```bash
   git clone https://git.empresa.com.br/repositorio-privado.git
   cd repositorio-privado  
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

### 📅 *Planejamento do Projeto*
### Fases do Desenvolvimento
1. *Fase 1*: Configuração inicial e arquitetura básica (Clean Architecture e PrimeVue).
2. *Fase 2*: Implementação de funcionalidades ERP (cadastro, estoque, relatórios).
3. *Fase 3*: Desenvolvimento do módulo PDV.
4. *Fase 4*: Integrações e ajustes finais.

### 🧪 Testes
### Cobertura de Testes
- Todos os casos de uso e regras de negócio devem ser cobertos por testes unitários.
- Utilize o comando abaixo para rodar os testes:
  ```bash
  npm run test
  ````

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


---

### **Como Usar Este README**
1. Personalize as informações da empresa (nome, links, e-mails, etc.).
2. Adicione o arquivo ao repositório privado para que todos os envolvidos no projeto tenham acesso.
3. Se necessário, crie um diretório adicional `docs/` para documentações detalhadas internas, como diagramas e manuais técnicos.

Se precisar de mais ajustes, posso refinar este conteúdo para atender 100% às suas necessidades! 🚀

