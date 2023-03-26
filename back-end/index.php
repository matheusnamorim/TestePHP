<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  
  $data = $pdo->query("SELECT * FROM people")->fetchAll();

  foreach ($data as $row) {
    echo $row['name']."\n";
  }
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'));
  $pdo->query("INSERT INTO people (name, cpf, rg, cep, street, complement, sector, city, uf) VALUES ('$data->name','$data->cpf','$data->rg','$data->cep','$data->street','$data->complement','$data->sector','$data->city','$data->uf');");
  $phone = json_encode($data->phones);

  echo "Inserido com sucesso!";
}
