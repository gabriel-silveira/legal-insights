<?php

namespace Database;

class MySQL {
    
    public function __construct() {
        try {
            $this->conn = $this->conn();
        } catch (Exception $ex) {
            print $ex->getMessage();
        }
    }
    
    public function conn() {
        return new \PDO('mysql:host='.$_ENV['HOST'].';
        dbname='.$_ENV['NAME'], 
        $_ENV['USUARIO'],
         $_ENV['PASS']);
    }
    
    public function insert($query, $arr = '') {
        try {
            $res = $this->conn->prepare($query);
            if(is_array($arr)) {
                foreach($arr as $key => &$value) {
                    $res->bindValue($key, ($value));
                }
            }
            $res->execute();
            
            //print $res->rowCount();
        } catch (Exception $ex) {
            die($ex->getMessage());
            exit;
        }
        
        return $this->conn->lastInsertId();
    }
    
    
    
    public function update($query, $arr = '') {
        try {
            $res = $this->conn->prepare($query);
            if(is_array($arr)) {
                foreach($arr as $key => &$value) {
                    $res->bindValue($key, ($value));
                }
            }
            $res->execute();
        } catch (Exception $ex) {
            die($ex->getMessage());
            exit;
        }
        
        return true;
    }
    
    
    
    public function fetch_array($query, $arr = '') {
        
        $res = $this->conn->prepare($query);
        
        if(is_array($arr)) {
            $res->execute($arr);
        } else {
            $res->execute();
        }
        
        $RESULT = $res->fetchAll($this->conn::FETCH_ASSOC);
        
        $total = count($RESULT);
        
        if($total > 1) {
            
            $i = 0;
            
            foreach($RESULT as $row) {
                foreach($row as $field => $value) {
                    if($value !== '') {
                        $ARR[$i][$field] = utf8_encode($value);
                    }
                }
                $i++;
            }
            
            return $ARR;
            
        } else if($total === 1) {
            
            foreach($RESULT as $row) {
                foreach($row as $field => $value) {
                    if($value !== '') {
                        $ARR[0][$field] = utf8_encode($value);
                    }
                }
            }
            
            return $ARR;
            
        } else {
            return false;
        }
    }
}
