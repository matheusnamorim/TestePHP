<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

require_once("db.php");

$data = $pdo->query("SELECT * FROM vouchers")->fetchAll();

foreach ($data as $row) {
  echo $row['code']."<br />\n";
}
