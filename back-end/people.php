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

  public function getName(){
    return $this->name;
  }

  public function getCpf(){
    return $this->cpf;
  }

  public function getRg(){
    return $this->rg;
  }

  public function getCep(){
    return $this->cep;
  }

  public function getStreet(){
    return $this->street;
  }

  public function getComplement(){
    return $this->complement;
  }

  public function getSector(){
    return $this->sector;
  }

  public function getCity(){
    return $this->city;
  }

  public function getUf(){
    return $this->uf;
  }

  public function getPhones(){
    return $this->phones;
  }

  public function getData(){
    echo "{$this->name}, {$this->cpf}, {$this->rg}, {$this->cep}, {$this->street}, {$this->complement}, {$this->sector}, {$this->city}, {$this->uf}\n";

    foreach($this->phones as $values){
      echo "{$values}\n";
    }
  }
}

