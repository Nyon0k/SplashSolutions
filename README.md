# Splash Solutions
O Splash solutions é um pequeno projeto de back-end com CRUDs para uma aplicação de pedido e entrega de água e outros produtos, feito como treinamento na EJCM para explorar diferentes funcionalidades do Node.js como iniciativa para troca de stack.

## Instalação
Para rodar o projecto, crie um arquivo "database.sqlite" na pasta "databases" execute os seguintes comandos:
npm install (para instalar dependências)
npm run typeorm migration:run (para executar migrations)
npm run dev (para rodar o projeto)

### Obs
As tabelas do BD implementam algumas funcionalidades diferentes entre si, adicionadas como exemplo para avaliar sua implementação usando o Node.js. A tabela de usuários (Users) por exemplo, possui um esquema de validação de campos.
Para testar a aplicação, use API Clients como [Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/download/) para interagir com ela através de requisições HTTP.

Para mais detalhes a respeito de como construímos o projeto, temos uma [página no Notion](https://www.notion.so/Splash-Solutions-440121619d1847c98592ad20e3dbe41e)
