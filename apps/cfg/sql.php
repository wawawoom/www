<?php
// Charger la configuration depuis les variables d'environnement
include_once ('config.php');

// Récupérer toutes les variables de configuration
$cfg = Config::getConfig();

// Utiliser les noms originaux des variables
// Méthode 1: Accès direct au tableau avec la clé
$host = $cfg['DB_HOST'];
$user = $cfg['DB_USER'];
$pass = $cfg['DB_PASSWORD'];
$database = $cfg['DB_NAME'];

// Méthode 2: Utiliser la méthode Config::get() (recommandée avec valeur par défaut)
// $host = Config::get('DB_HOST', 'localhost');
// $user = Config::get('DB_USER', 'root');

// Méthode 3: Accès via $_ENV (si disponible)
// $host = $_ENV['DB_HOST'] ?? 'localhost';

// ****************************//
// CONNEXION A MYSQL AVEC MYSQLI
// ****************************//
$connex = @mysqli_connect($host, $user, $pass, $database);

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