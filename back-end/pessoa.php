<?php
require_once("phones.php");

class People{
  public $name;
  public $cpf;
  public $rg;
  public $cep;
  public $street;
  public $complement;
  public $sector;
  public $city;
  public $uf;
  public $phones = array();

  public function __construct($name, $cpf, $rg, $cep, $street, $complement, $sector, $city, $uf, $phones){
    $this->name = $name;
    $this->cpf = $cpf;
    $this->rg = $rg;
    $this->cep = $cep;
    $this->street = $street;
    $this->complement = $complement;
    $this->sector = $sector;
    $this->city = $city;
    $this->uf = $uf;
    $this->phones = $phones;
  }

  public function getData(){
    return "{$this->name}, {$this->cpf}, {$this->rg}, {$this->cep}, {$this->street}, {$this->complement}, {$this->sector}, {$this->city}, {$this->uf}, {$this->phones}";
  }
}