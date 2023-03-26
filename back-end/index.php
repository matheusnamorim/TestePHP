<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  
  $data = $pdo->query("SELECT * FROM games")->fetchAll();

  foreach ($data as $row) {
    echo $row['teamOne']."\n";
  }
}

