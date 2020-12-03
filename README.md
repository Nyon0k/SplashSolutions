O Splash solutions é um pequeno projeto de back-end para uma aplicação de pedido e entrega de água e outros produtos, feito como treinamento na EJCM para explorar diferentes funcionalidades do Node.js como iniciativa para troca de stack.
Para rodar o projecto, crie um arquivo "database.sqlite" na pasta "databases" execute os seguintes comandos:
npm install (para instalar dependências)
npm run typeorm migration:run (para executar migrations)
npm run dev (para rodar o projeto)
As tabelas do BD implementam algumas funcionalidades diferentes entre si, adicionadas como exemplo para avaliar sua implementação usando o Node.js. A tabela de usuários (Users) por exemplo, possui um esquema de validação de campos.
