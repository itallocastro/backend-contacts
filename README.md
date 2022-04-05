# Backend Test Bravi

## Execução via heroku

O teste está hospedado na heroku e pode ser acessado por esse link: https://frontend-test-bravi.herokuapp.com/

## Rodar via docker
  Você deve clonar o repositório `git clone https://github.com/itallocastro/test-bravi-backend.git`
  <br>
  <br>
  Depois você deve acessar a pasta do projeto e rodar: `docker-compose up`
  <br>
  <br>
  Após isso, você deverá abrir outro terminal e executar: `docker-compose run --rm node_api /bin/bash`
  <br>
  <br>
  Agora para rodar as migrations você deve rodar nesse novo terminal: `npx sequelize db:migrate`
  <br>  
  <br>
  Por fim, a api estará disponível em localhost:3600

## Rodar localmente
### Requisitos:
- Node version: 12.x.x
- Postgres


Você deve clonar o repositório `git clone https://github.com/itallocastro/test-bravi-backend.git`
<br>
<br>
Depois você deve acessar a pasta do projeto e rodar: `npm install`
Você deve criar um arquivo .env dentro do projeto com os seguintes campos que você irá definir:
<br>
```
PORT=
HOST_DB=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
```
<br>
<br>
Depois você deve rodar: `node index.js` e a porta padrão será a que você definiu no .env.
<br>
<br>
