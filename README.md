# Product Management System Backend

<div align="center">
  <img width="150px" src="https://img.freepik.com/vetores-gratis/manipulacao-e-processamento-de-pedidos-de-ilustracao-em-vetor-conceito-abstrato-documentacao-de-pedido-sistema-de-processamento-tratamento-de-solicitacao-de-cliente-logistica-metafora-abstrata-de-operacoes-logisticas-automatizadas_335657-1789.jpg">
</div>

<p align="center">
  <a href="#star-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#keyboard-tecnologias">Tecnologias</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer_mouse-instalação">Instalação</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#round_pushpin-rotas">Rotas</a>
</p>

# :star: Features

Essa API compõe uma série de serviços voltados para um sistema de gerenciamento de produtos.
Com ela é possível realizar a visualização e gerenciamento de produtos, bem como cada uma das informações vinculadas eles, como imagem, custo de produção e preço de venda.

Algumas funcionalidades da aplicação são:

- Manipulação de informações dos produtos que compõem o estoque;
- Manipulação de informações de preço de venda relacionado às lojas que vendem esses produtos.

# :keyboard: Tecnologias

As tecnologias utilizadas no projeto foram:

- <img align="left" alt="NodeJs" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> NodeJs
- <img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" /> TypeScript
- <img align="left" alt="NestJs" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" /> NestJs

- <img align="left" alt="TypeORM" width="30px" style="padding-right:10px;" src="https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png" /> TypeORM

Além disso, foram acoplados ao projeto os conceitos de Clean Architecture e SOLID como metodologia de guia de trabalho. Dessa forma a interface da API foi construída com base nos devidos Design Patterns para que tivesse uma arquitetura desacoplada e bem definida.

# :computer_mouse: Instalação

Primeiramente é preciso ter o node instalado em sua máquina em sua versão LTS, bem como o Docker. 

Em seguida, não se esqueça de criar o arquivo .env com base no arquivo .env.example (caso o arquivo .env seja idêntico ao exemplo, a aplicação já deve funcionar normalmente). 

A partir disso, basta executar os passos para executar a API na porta 3000:

```bash
# Clonar o repositório
git clone https://github.com/paulojr-eco/product-management-system-backend.git

# Acessar o diretório
cd product-management-system-backend

# Subir os containers de banco de dados, pgAdmin e da aplicação em si
docker-compose up -d
```

Após isso, acesse o pgAdmin através da rota <a href="http:localhost:9000">http:localhost:9000</a>, informe as credenciais => login: `admin@user.com` senha: `123456` e crie um novo server com base nas informações: host name: `db` username: `postgres` password: `root` e acesse o banco `product-management-system`. Nisso verifique se as tabelas `produto`, `loja` e `produtoloja` não estão criadas. Caso não estejam, execute o script SQL presente em `.docker/postgres/init.sql` para criá-las.

Pronto! O ambiente foi configurado com sucesso.

# :round_pushpin: Rotas

Para facilitar o acesso as rotas acesse a <a href="https://www.postman.com/interstellar-sunset-591957/workspace/product-system-management/collection/16394034-0b4c6545-82e1-4e2f-ae02-35c5d3e5175d?action=share&creator=16394034" target="_blank"> workspace </a> criada pelo Postman
