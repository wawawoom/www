<?php

/**
 * Configuration des variables d'environnement
 * Charge les variables depuis les fichiers .env selon l'environnement
 */
class Config
{
    private static $config = [];

    public static function load()
    {
        // Si déjà chargé, ne pas recharger
        if (count(self::$config) > 0) {
            return;
        }

        // Déterminer l'environnement
        $env = self::getEnvironment();

        // Load the .env file (tries several paths: project parent, then FTP root / document root)
        $envFile = self::getEnvFile($env);

        if ($envFile !== null && file_exists($envFile)) {
            self::parseEnvFile($envFile);
        } else {
            error_log('Config: No .env file found. Tried: ' . implode(', ', self::getEnvFileCandidates($env)));
            error_log('Config: In production, put .env.production at FTP root (e.g. /www/.env.production) or next to cfg.');
        }
    }

    private static function getEnvironment()
    {
        // Détection automatique pour OVH
        if (isset($_SERVER['HTTP_HOST'])) {
            $host = $_SERVER['HTTP_HOST'];
            if (strpos($host, 'wawawoom.fr') !== false ||
                    strpos($host, 'ovh') !== false) {
                return 'production';
            }
        }

        // Par défaut : local
        return 'local';
    }

    private static function getEnvFileCandidates($env)
    {
        $envFileName = '.env.' . ($env === 'production' ? 'production' : 'local');
        $candidates = [];

        // Docker path
        $candidates[] = '/var/www/' . $envFileName;

        // Production: env file at filesystem root (FTP root is /)
        if ($env === 'production') {
            $candidates[] = '/' . $envFileName;
        }

        // Parent of cfg (e.g. .../projects/.env.production)
        $candidates[] = dirname(dirname(__DIR__)) . '/' . $envFileName;

        // Document root and parents
        if (!empty($_SERVER['DOCUMENT_ROOT'])) {
            $candidates[] = rtrim($_SERVER['DOCUMENT_ROOT'], DIRECTORY_SEPARATOR) . '/' . $envFileName;
            $parent = dirname($_SERVER['DOCUMENT_ROOT']);
            $candidates[] = $parent . '/' . $envFileName;
            $candidates[] = dirname($parent) . '/' . $envFileName;
        }

        return $candidates;
    }

    private static function getEnvFile($env)
    {
        foreach (self::getEnvFileCandidates($env) as $path) {
            if (file_exists($path)) {
                return $path;
            }
        }

        return null;
    }

    private static function parseEnvFile($file)
    {
        if (!file_exists($file)) {
            error_log('Config: Fichier .env non trouvé: ' . $file);
            return;
        }

        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if ($lines === false) {
            error_log('Config: Impossible de lire le fichier .env: ' . $file);
            return;
        }

        foreach ($lines as $line) {
            // Ignorer les commentaires
            if (strpos(trim($line), '#') === 0) {
                continue;
            }

            // Parser les variables KEY=VALUE
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);

                // Ignorer les clés vides
                if (empty($key)) {
                    continue;
                }

                // Ignorer les variables système non désirées
                if ($key === 'GPG_KEYS' ||
                        $key === 'LANG' ||
                        $key === 'PHPIZE_DEPS') {
                    continue;
                }

                // Supprimer les guillemets
                $value = trim($value, '"\'');

                self::$config[$key] = $value;
                $_ENV[$key] = $value;
            }
        }
    }

    public static function get($key, $default = null)
    {
        return isset(self::$config[$key]) ? self::$config[$key] : $default;
    }

    public static function getConfig()
    {
        // S'assurer que la configuration est chargée avant de retourner le tableau
        // Utiliser count() au lieu de empty() car empty() peut retourner true même si le tableau contient des valeurs
        if (count(self::$config) === 0) {
            self::load();
        }

        return self::$config;
    }
}

// Charger automatiquement la configuration
Config::load();
?>