<?php

namespace Model;

class User extends \Database\Mysql {
    function __construct($user_id = 0) {
        if($user_id) {
            $this->id = $user_id;
            $this->get_user();
        }
    }

    private function get_user() {
        print($this->id);
    }

    static function is_logged() {
        return isset($_SESSION['user_id']);
    }
}