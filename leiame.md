```
      .     .____    ___       .    .          _ __    _   _____ _   ___   __  __  _______   _____
       /     /      .'   \     /|    /          | |\   |   (      | .'   \  |   |  '   /     (     
       |     |__.   |         /  \   |          | | \  |    `--.  | |       |___|      |      `--. 
       |     |      |    _   /---'\  |          | |  \ |       |  | |    _  |   |      |         | 
       /---/ /----/  `.___|,'      \ /---/      / |   \|  \___.'  /  `.___| /   /      /    \___.' 
```                                                                                             
# legal-insights
Aplicação para controle de processos judiciais.

## Descrição
> Projeto exemplo. Esta aplicação foi originalmente criada para um teste e posteriormente ampliada, adicionando-se mais recursos ao projeto inicial. Veja mais detalhes no changelog.

### Construído com:

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Flask](http://flask.pocoo.org/) - Flask is a microframework for Python
* [React Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [MySQL](https://www.mysql.com/) -  The world's most popular open source database

### O que você encontrará aqui:
* **Processos:**
  * Adicionar, editar e excluir
* **Pedidos de processos:**
  * Adicionar pedidos ao processos, editar e excluir
* **Buscas**:
  * Por número do processo, réu principal, estado, cidade, data de distribuição

## Instalação
> As instruções a seguir (passos 1 e 2) consideram que o MySQL está devidamente instalado em seu ambiente.
### Passo 1: Base de dados
Crie um novo banco de dados com o nome *legal_insights* (collation utf8_general_ci).
Importe ou execute o conteúdo do arquivo **li.sql** que se encontra na raiz do projeto para criar e popular as tabelas de dados necessárias para a aplicação.
### Passo 2: Configurando a API
> Para que o Flask funcione, certifique-se de que tenha o Python na versão 3.6 e o pacote python3-venv instalado.

Abra o terminal (CTRL + ALT + T no Linux).

Você pode ver a versão do seu Python no terminal com o comando a seguir:
```console
python3 --version
```
Se a versão 3.6 não estiver instalada, o comando abaixo instalará para você.
```console
sudo apt install python3
```

Enfim, instale o python3-venv:
```console
sudo apt install python3-venv
```

Tudo ok? Vamos começar... :collision:

No diretório do projeto, entre em **api**, crie e ative o _virtual enviroment_:
```console
cd api
python3 -m venv venv
. venv/bin/activate
```
Execute o script shell para instalar as dependências do projeto:
* Flask
* PyMySQL
* python-dotenv
* Flask-CORS
```console
./pip-install
```
Altere as variáveis de acesso ao MySQL no arquivo **.env**:
```console
DB_HOST=localhost
DB_USER=bill
DB_PASS=bill
DB_NAME=legal_insights
```
O comando abaixo iniciará a aplicação em _127.0.0.1_ na porta _5000_:
```console
./serve
```

