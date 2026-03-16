#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Monorepo root (two levels up from apps/www/scripts)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")/../.."
cd "$PROJECT_ROOT" || exit 1

# Charger les variables d'environnement depuis .env à la racine du monorepo si le fichier existe
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo "📄 Chargement des variables depuis .env (racine du monorepo)..."
    set -a
    while IFS= read -r line || [ -n "$line" ]; do
        if [[ ! "$line" =~ ^[[:space:]]*# ]] && [[ -n "$line" ]]; then
            export "$line"
        fi
    done < "$PROJECT_ROOT/.env"
    set +a
fi

# Configuration FTP
FTP_HOST="${FTP_HOST:-ftp.cluster015.hosting.ovh.net}"
FTP_USER="${FTP_USER:-wawawoom}"
FTP_PORT="${FTP_PORT:-21}"

# Le mot de passe FTP doit être fourni via la variable d'environnement FTP_PASS
if [ -z "$FTP_PASS" ]; then
    echo "❌ Erreur: La variable d'environnement FTP_PASS n'est pas définie !"
    echo ""
    echo "💡 Pour définir le mot de passe FTP, vous avez plusieurs options :"
    echo ""
    echo "   1. Créer un fichier .env à la racine du projet avec :"
    echo "      FTP_PASS=\"votre_mot_de_passe\""
    echo ""
    echo "   2. Exporter la variable dans votre shell :"
    echo "      export FTP_PASS=\"votre_mot_de_passe\""
    echo ""
    echo "   3. La passer directement lors de l'exécution :"
    echo "      FTP_PASS=\"votre_mot_de_passe\" bash scripts/deploy.sh"
    echo ""
    echo "   📝 Voir .env.example pour un exemple de configuration"
    exit 1
fi

SOURCE_DIR="${SOURCE_DIR:-apps/www/dist}"
FTP_DIR="${FTP_DIR:-/www/}"

echo "🚀 Début de l'upload FTP..."
echo "📁 Dossier de destination: $FTP_DIR"
echo ""

# Vérifier que le dossier source existe et contient des fichiers
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Le dossier $SOURCE_DIR/ n'existe pas !"
    echo "💡 Exécutez d'abord 'npm run build' pour créer les fichiers à uploader."
    exit 1
fi

if [ -z "$(ls -A "$SOURCE_DIR" 2>/dev/null)" ]; then
    echo "⚠️  Le dossier $SOURCE_DIR/ est vide !"
    echo "💡 Exécutez d'abord 'npm run build' pour générer les fichiers à uploader."
    exit 1
fi

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé. Installation..."
    if command -v brew &> /dev/null; then
        brew install lftp
    else
        echo "❌ Veuillez installer lftp manuellement : brew install lftp"
        exit 1
    fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Upload vers le serveur FTP..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 Upload du contenu de $SOURCE_DIR/ vers $FTP_DIR"
echo ""

# Upload de tout le contenu de SOURCE_DIR vers FTP_DIR
lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
cd $FTP_DIR
lcd $SOURCE_DIR
mirror -R . . --verbose --exclude-glob .DS_Store
quit
EOF

upload_result=$?

echo ""
if [ $upload_result -eq 0 ]; then
    echo "✅ Upload FTP réussi !"
    echo "✅ Les fichiers sont maintenant en ligne dans $FTP_DIR"
    exit 0
else
    echo "❌ Erreur lors de l'upload FTP (code: $upload_result)"
    exit 1
fi
