<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'models/MySQL.php';

$config = [
    'settings' => [
        'displayErrorDetails' => true
    ],
];
$app = new \Slim\App($config);
$container = $app->getContainer();
$container['db'] = new \Database\MySQL;


$app->get('/hello', function (Request $request, Response $response, array $args) {
    $user = $this['db']->fetch_array("SELECT nome FROM users WHERE id = 1");

    $response->getBody()->write("Benvindo, ".$user[0]['nome']."! Você é o cara!!!");

    return $response;
});
$app->run();

