<?php

$usuario = "postgres";
$senha = "123456";
$endereco = "localhost";
$banco = "testephp";

try{
  $pdo = new PDO("pgsql:host=$endereco;port=5432;dbname=$banco", $usuario, $senha, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  //echo "Conectado ao banco de dados.";
}catch (PDOException $e) {
  echo "Falha ao conectar ao banco de dados. <br/>";
  die($e->getMessage());
}