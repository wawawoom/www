#!/bin/bash

# Upload des rapports de couverture Jest de la lib WUI vers le FTP
# Prérequis : les tests doivent tous passer (exit 0) avant l'upload

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
WUI_DIR="$PROJECT_ROOT/libs/wui"
COVERAGE_DIR="$WUI_DIR/coverage/lcov-report"
FTP_DIR_DEFAULT="/www/next/projects/wui/tests/"

cd "$PROJECT_ROOT" || exit 1

# Charger les variables d'environnement depuis .env si le fichier existe
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo "📄 Chargement des variables depuis .env..."
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
FTP_DIR="${FTP_DIR:-$FTP_DIR_DEFAULT}"

if [ -z "$FTP_PASS" ]; then
    echo "❌ Erreur: La variable d'environnement FTP_PASS n'est pas définie !"
    echo ""
    echo "💡 Définir FTP_PASS dans .env ou : export FTP_PASS=\"votre_mot_de_passe\""
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Tests Jest + upload coverage (lib WUI)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Lancer les tests avec couverture
echo "📋 Lancement des tests avec couverture dans libs/wui..."
echo ""

cd "$WUI_DIR" || exit 1
if ! pnpm run test:coverage; then
    echo ""
    echo "❌ Les tests n'ont pas tous réussi. Upload annulé."
    exit 1
fi

cd "$PROJECT_ROOT" || exit 1

echo ""
echo "✅ Tous les tests sont passés."
echo ""

# 2. Vérifier que le dossier coverage existe et n'est pas vide
if [ ! -d "$COVERAGE_DIR" ]; then
    echo "❌ Le dossier $COVERAGE_DIR/ n'existe pas !"
    exit 1
fi

if [ -z "$(ls -A "$COVERAGE_DIR" 2>/dev/null)" ]; then
    echo "❌ Le dossier $COVERAGE_DIR/ est vide !"
    exit 1
fi

# 3. Vérifier lftp
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé. Installation : brew install lftp"
    exit 1
fi

# 4. Upload FTP
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Upload du rapport de couverture vers le serveur FTP..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 Source: $COVERAGE_DIR/"
echo "📁 Destination: $FTP_DIR"
echo ""

lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
cd $FTP_DIR
lcd $COVERAGE_DIR
mirror -R . . --verbose --exclude-glob .DS_Store
quit
EOF

upload_result=$?

echo ""
if [ $upload_result -eq 0 ]; then
    echo "✅ Upload FTP réussi !"
    echo "✅ Le rapport de couverture est en ligne dans $FTP_DIR"
    exit 0
else
    echo "❌ Erreur lors de l'upload FTP (code: $upload_result)"
    exit 1
fi
