<?php

class Phones{
  public $phone;
  public $description;

  public function __construct($phone, $description){
    $this->phone = $phone;
    $this->description = $description;
  }

  public function getPhone(){
    return $this->phone;
  }

  public function getDescription(){
    return $this->description;
  }

  public function getData(){
    return "{$this->phone} - {$this->description}";
  }
}
