<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Otimizador de Prompt

https://github.com/user-attachments/assets/7573082b-55b1-4029-bd59-8aef29e3f401

## Demonstração## Sobre o projeto

O **Otimizador de Prompt** é uma aplicação web desenvolvida para aprimorar e refinar prompts. Utilizando o poder da API Google Gemini, esta ferramenta 
analisa o prompt inicial do usuário e sugere versões otimizadas, visando gerar respostas mais precisas, relevantes e criativas.

### Funcionalidades Principais

  * **Interface Simples:** Uma área de texto para o usuário inserir seu prompt original.
  * **Otimização Inteligente:** Conexão com a API Gemini para processar e sugerir melhorias no prompt.
  * **Visualização Comparativa:** Exibição do prompt original ao lado da versão otimizada, facilitando a visualização das melhorias.

## Tecnologias Utilizadas

* React
* TypeScript
* HTML5
* Google Gemini API
* Node.js
* Vite

## Instalação e Configuração

### Pré-requisitos

  * [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
  * [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
  * Uma chave de API do Google Gemini. Você pode obter a sua no [Google AI Studio](https://www.google.com/search?q=https://ai.studio/google-ai-studio/).

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/MaduAraujo/Otimizador-de-Prompt.git
    cd Otimizador-de-Prompt
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure sua chave de API:**

      * Crie um arquivo chamado `.env.local` na raiz do projeto.
      * Adicione sua chave da API Gemini a este arquivo:

    ```.env
    GEMINI_API_KEY=SUA_CHAVE_API_AQUI
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (ou a porta indicada pelo Vite no seu terminal).
