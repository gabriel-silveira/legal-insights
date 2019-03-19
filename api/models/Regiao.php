<?php

namespace Model;

class Regiao extends \Database\Mysql {
    
    public $estados = [];
    public $estados_siglas = [];
    public $municipios = [];

    function __construct() {
        parent::__construct();
    }

    function get_estados_siglas() {
        $estados = $this->fetch_array("SELECT sigla FROM estados");
        $siglas = [];
        foreach($estados as $estado) array_push($siglas, $estado['sigla']);
        $this->estados_siglas = $siglas;
    }

    function get_municipios($uf) {
        $ms = $this->fetch_array("SELECT * FROM municipios WHERE uf = '$uf'");
        $municipios = [];
        foreach($ms as $municipio) array_push($municipios, array('codibge'=>$municipio['codibge'], 'nome'=>$municipio['nome']));
        $this->municipios = $municipios;
    }
}