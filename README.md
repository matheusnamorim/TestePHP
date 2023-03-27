# TestePHP
Para conseguir executar o projeto será necessário realizar algumas alterações.

Primeiramente no back-end será necessário alterar o arquivo "db.php", as variáveis "usuario", "senha" são locais, ou seja 
é preciso configurar de acordo com seu postgreSQL. 

#### OBS: É preciso verificar se a porta do PostgreSQL é realmente a porta padrão 5432.

Depois de alterar o arquivo "db.php" é preciso rodar os comandos para criar a database e as tabelas necessárias do projeto:

CREATE DATABASE testephp;

<div>
CREATE TABLE people( <br>
    id SERIAL PRIMARY KEY, <br>
    "name" TEXT,<br>
    "cpf" TEXT,<br>
    "rg" TEXT,<br>
    "cep" TEXT,<br>
    "street" TEXT,<br>
    "complement" TEXT,<br>
    "sector" TEXT,<br>
    "city" TEXT,<br>
    "uf" TEXT<br>
);<br>
<div/>
<div>
<br>
CREATE TABLE phones(<br>
	id SERIAL PRIMARY KEY,<br>
	"userid" INTEGER NOT NULL REFERENCES "people"("id"),<br>
	"phone" TEXT,<br>
	"description" TEXT<br>
);
<div/>

<div>
<br>
Por fim, utilize o XAMPP para rodar o servidor local apontando para a pasta que salvar o projeto.
<div/>

#### OBS: Será necessário alterar o arquivo C:\xampp\apache\conf\httpd.conf (Podendo variar o diretório de acordo com seu local de instalação do XAMPP).

Localize as seguintes linhas e altere os valores para a pasta que salvar o projeto:

DocumentRoot "C:\Documentos\Projetos\PHP\TestePHP\back-end"

<Directory "C:\Documentos\Projetos\PHP\TestePHP\back-end">

Se tudo estiver correto, poderá acessar o back-end via 'localhost/'.

Para rodar o Front-end será necessário rodar o comando 'npm i' dentro da pasta /TESTEPHP/front-end para baixar todo o necessário
do projeto React e ao finalizar rodar 'npm start' para iniciar o projeto.

## Com o front-end rodando o projeto será este:
![image](https://user-images.githubusercontent.com/107131039/227853844-4a3dcd68-fa4e-4429-81b5-1315bb489d6b.png)


