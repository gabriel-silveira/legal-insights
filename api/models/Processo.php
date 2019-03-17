<?php

namespace Model;

class Processo extends \Database\Mysql {
    
    public $processos = [];
    public $processo = [];
    public $ppp = 1; // processos por página

    function __construct() {
        parent::__construct();
    }

    function obter_processo($id) {
        $p = $this->fetch_array("SELECT 
            p.num_processo, 
            DATE_FORMAT(p.data_distrib, '%d/%m/%Y') as data_distrib,
            p.reu_principal,
            p.valor_causa,
            p.vara,
            p.comarca as codibge,
            c.nome as comarca,
            p.uf,
            DATE_FORMAT(FROM_UNIXTIME(p.criado), '%d/%m/%Y') as criado,
            p.atualizado
            FROM processos as p
            LEFT JOIN comarcas as c ON p.comarca = c.codibge 
            WHERE num_processo = '".$id."'");
        $this->processo = $p[0];
    }

    function obter_processos($page = 1) {
        $ps = $this->fetch_array("SELECT 
                                    p.num_processo, 
                                    DATE_FORMAT(p.data_distrib, '%d/%m/%Y') as data_distrib,
                                    p.reu_principal,
                                    p.valor_causa,
                                    p.vara,
                                    p.comarca as codibge,
                                    c.nome as comarca,
                                    p.uf,
                                    DATE_FORMAT(FROM_UNIXTIME(p.criado), '%d/%m/%Y') as criado,
                                    p.atualizado
                                    FROM processos as p
                                    LEFT JOIN comarcas as c ON p.comarca = c.codibge 
                                    ORDER BY criado");
        $this->processos['items'] = $ps;
        $this->processos['total'] = count($ps);
        $this->processos['limite'] = $this->ppp;
        $this->processos['pagina'] = $page;
        $this->processos['paginas'] = $this->processos['total'] / $this->ppp;
    }
}