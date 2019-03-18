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
            DATE_FORMAT(FROM_UNIXTIME(p.atualizado), '%d/%m/%Y') as atualizado
            FROM processos as p
            LEFT JOIN comarcas as c ON p.comarca = c.codibge 
            WHERE num_processo = '".$id."'");
        $this->processo = $p[0];
    }

    function obter_processos($page = 1) {
        $processos = $this->fetch_array("SELECT 
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
                                    ORDER BY criado DESC");
        
        $fim = $page * $this->ppp;
        $inicio = $fim - $this->ppp;

        $i = 1;
        foreach($processos as $processo) {
            if($i > $inicio && $i <= $fim) $this->processos['items'][] = $processo;
            $i++;
        }
        $this->processos['total'] = count($processos);
        $this->processos['limite'] = $this->ppp;
        $this->processos['pagina'] = (int)$page;
        $this->processos['paginas'] = $this->processos['total'] / $this->ppp;
    }
}