<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Middleware\CorsMiddleware as Cors;

require './vendor/autoload.php';

// .env
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

// importa todos os models
foreach(scandir('./models/') as $filename) if(!in_array($filename, ['.','..'])) require './models/'.$filename;

// inicia e configura slim
$app = new \Slim\App([ 'settings' => [ 'displayErrorDetails' => true, 'addContentLengthHeader' => false ]]);
$app->add(new Tuupola\Middleware\CorsMiddleware);
$container = $app->getContainer();
// adiciona models ao slim
$container['user'] = new \Model\User;
$container['processo'] = new \Model\Processo;
$container['regiao'] = new \Model\Regiao;





// obter lista de processos
$app->get('/api/estados/siglas', function(Request $request, Response $response) {
    $this['regiao']->get_estados_siglas();
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($this['regiao']->estados_siglas));
});

// obter lista de processos
$app->get('/api/processos/page/{page}', function(Request $request, Response $response, array $args) {
    $this['processo']->obter_processos($args['page']);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($this['processo']->processos));
});

// obter lista de processos
$app->get('/api/processos/{id}', function(Request $request, Response $response, array $args) {
    $this['processo']->obter_processo($args['id']);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($this['processo']->processo));
});

// obter dados do usuário
$app->get('/api/user/{id}', function (Request $request, Response $response, array $args) {
    $user = $this['db']->fetch_array("SELECT nome, usuario FROM users WHERE id = ".$args['id']);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($user[0]));
});

$app->run();
