#!/bin/bash

# Usage: [upload|download|sync] 
#   upload   = envoie le contenu local vers le serveur (sans supprimer côté serveur)
#   download = récupère le contenu du serveur en local (supprime en local ce qui n’est pas sur le serveur)
#   sync     = synchronise local → serveur (envoie + supprime côté serveur ce qui n’est plus en local)
COMMAND="${1:-upload}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
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

# Configuration FTP (même variables que deploy-www.sh)
# FTP_DIR / chemin distant : pris depuis CDN_PATH dans .env si non fourni
SOURCE_DIR="${SOURCE_DIR:-apps/cdn}"
FTP_DIR="${FTP_DIR:-${CDN_PATH:-/www/next/cdn}}"
FTP_HOST="${FTP_HOST:-ftp.cluster015.hosting.ovh.net}"
FTP_USER="${FTP_USER:-wawawoom}"
FTP_PORT="${FTP_PORT:-21}"

if [ -z "$FTP_PASS" ]; then
    echo "❌ Erreur: La variable d'environnement FTP_PASS n'est pas définie."
    echo "   Ajoutez FTP_PASS=\"votre_mot_de_passe\" dans .env (à la racine du projet)."
    exit 1
fi

if [ "$COMMAND" != "download" ] && [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Le dossier $SOURCE_DIR/ n'existe pas !"
    exit 1
fi

if [ "$COMMAND" = "download" ] && [ ! -d "$SOURCE_DIR" ]; then
    mkdir -p "$SOURCE_DIR" || exit 1
fi

if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé."
    echo "   Installation: brew install lftp"
    exit 1
fi

LFTP_EXCLUDE="--exclude-glob .DS_Store --exclude-glob package.json --exclude-glob scripts --exclude-glob node_modules"

case "$COMMAND" in
  upload)
    echo "📤 Upload CDN (local → serveur)..."
    echo "   Source: $SOURCE_DIR/"
    echo "   Cible:  $FTP_DIR sur $FTP_HOST"
    echo ""
    lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
mkdir -p $FTP_DIR
cd $FTP_DIR
lcd $SOURCE_DIR
mirror -R . . --verbose $LFTP_EXCLUDE
quit
EOF
    ;;
  download)
    echo "📥 Download CDN (serveur → local)..."
    echo "   Source: $FTP_DIR sur $FTP_HOST"
    echo "   Cible:  $SOURCE_DIR/"
    echo ""
    lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
cd $FTP_DIR
lcd $SOURCE_DIR
mirror . . --verbose --delete $LFTP_EXCLUDE
quit
EOF
    ;;
  sync)
    echo "🔄 Sync CDN (local → serveur, miroir exact)..."
    echo "   Source: $SOURCE_DIR/"
    echo "   Cible:  $FTP_DIR sur $FTP_HOST (fichiers absents en local seront supprimés)"
    echo ""
    lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
mkdir -p $FTP_DIR
cd $FTP_DIR
lcd $SOURCE_DIR
mirror -R . . --verbose --delete $LFTP_EXCLUDE
quit
EOF
    ;;
  *)
    echo "❌ Commande inconnue: $COMMAND"
    echo "   Usage: $0 [upload|download|sync]"
    exit 1
    ;;
esac

result=$?
echo ""
if [ $result -eq 0 ]; then
    echo "✅ CDN $COMMAND réussi."
    exit 0
else
    echo "❌ Erreur lors du $COMMAND (code: $result)"
    exit 1
fi
