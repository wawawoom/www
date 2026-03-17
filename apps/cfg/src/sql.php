<?php
// Load config from environment (via .env.local or .env.production)
include_once 'config.php';

$host = Config::get('DB_HOST');
$user = Config::get('DB_USER');
$pass = Config::get('DB_PASSWORD');
$database = Config::get('DB_NAME');

if ($host === null || $user === null || $pass === null || $database === null) {
    $missing = array_filter([
        'DB_HOST' => $host,
        'DB_USER' => $user,
        'DB_PASSWORD' => $pass,
        'DB_NAME' => $database,
    ], fn($v) => $v === null);
    error_log('Config: Missing DB credentials in .env: ' . implode(', ', array_keys($missing)));
    error_log('Config: In production, create /www/projects/.env.production with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    $connex = null;
} else {
    // ****************************//
    // MYSQL CONNECTION (MYSQLI)
    // ****************************//
    $connex = @mysqli_connect($host, $user, $pass, $database);
}

if (!$connex) {
    // Ne pas utiliser die() pour éviter d'arrêter l'exécution
    // Laisser la gestion d'erreur à la fonction appelante
    error_log('Erreur de connexion MySQL: ' . mysqli_connect_error());
    $connex = null;
}

// ******************************//
// CONFIGURATION DE L'ENCODAGE
// ******************************//
if ($connex) {
    mysqli_set_charset($connex, 'utf8');
}
?>