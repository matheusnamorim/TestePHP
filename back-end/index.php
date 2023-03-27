<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once("db.php");
require_once("phones.php");
require_once("people.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  
  if($_GET['path'] === 'listOfPeople'){
    $data = $pdo->query("SELECT * FROM people")->fetchAll();

    $result = json_encode($data);
    echo $result;
  }else if($_GET['path'] === 'listOfPhone'){
    $data = $pdo->query("SELECT * FROM phones;")->fetchAll();
    $result = json_encode($data);
    echo $result;
  }else if($_GET['path'] === 'people'){
    $data = $pdo->query("SELECT * FROM people WHERE id = {$_GET['id']};")->fetchAll();
    $result = json_encode($data);
    echo $result;
  }
  
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input')); 

  $array = array();
  $arrayPhones = array();
  $arrayDesc = array();

  foreach($data->phones as $values){
    $phone = new Phones($values->phone, $values->description);
    $array[] = $phone->getData();
    $arrayPhones[] = $phone->getPhone();
    $arrayDesc[] = $phone->getDescription();
  }

  $people = new People($data->name, $data->cpf, $data->rg, $data->cep, $data->street, $data->complement, $data->sector, $data->city, $data->uf, $array);

  $pdo->query("INSERT INTO people (name, cpf, rg, cep, street, complement, sector, city, uf) VALUES ('{$people->getName()}','{$people->getCpf()}','{$people->getRg()}','{$people->getCep()}','{$people->getStreet()}','{$people->getComplement()}','{$people->getSector()}','{$people->getCity()}','{$people->getUf()}');");
  $index = $pdo->lastInsertId();

  for($i = 0; $i<count($arrayPhones); $i++){
    $pdo->query("INSERT INTO phones (userid, phone, description) VALUES ('{$index}', '{$arrayPhones[$i]}', '{$arrayDesc[$i]}');");
  }
    
  echo "Inserido com sucesso!";
}

