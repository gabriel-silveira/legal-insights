<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Middleware\CorsMiddleware as Cors;

require './vendor/autoload.php';
// importa todos os models
foreach(scandir('./models/') as $filename) if(!in_array($filename, ['.','..'])) require './models/'.$filename;

// inicia e configura slim
$app = new \Slim\App([ 'settings' => [ 'displayErrorDetails' => true ]]);
$app->add(new Tuupola\Middleware\CorsMiddleware);
$container = $app->getContainer();
$container['db'] = new \Database\MySQL;
$container['processo'] = new \Model\Processo;

$app->get('/api/processos', function(Request $request, Response $response) {
    $processos = $this['db']->fetch_array("SELECT * FROM processos ORDER BY criado");
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($processos));
});

// obter dados do usuário
$app->get('/api/user/{id}', function (Request $request, Response $response, array $args) {
    $user = $this['db']->fetch_array("SELECT nome, usuario FROM users WHERE id = ".$args['id']);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($user[0]));
});

$app->run();
