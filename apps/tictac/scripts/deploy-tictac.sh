#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")/../.."
cd "$PROJECT_ROOT" || exit 1

# Load environment variables from .env if present
if [ -f "$PROJECT_ROOT/.env" ]; then
  echo "📄 Loading environment variables from .env..."
  set -a
  while IFS= read -r line || [ -n "$line" ]; do
    if [[ ! "$line" =~ ^[[:space:]]*# ]] && [[ -n "$line" ]]; then
      export "$line"
    fi
  done < "$PROJECT_ROOT/.env"
  set +a
fi

# FTP configuration
FTP_HOST="${FTP_HOST:-ftp.cluster015.hosting.ovh.net}"
FTP_USER="${FTP_USER:-wawawoom}"
FTP_PORT="${FTP_PORT:-21}"

if [ -z "$FTP_PASS" ]; then
  echo "❌ Error: FTP_PASS environment variable is not defined."
  echo "   Add FTP_PASS=\"your_password\" in .env at the project root."
  exit 1
fi

SOURCE_DIR="${SOURCE_DIR:-apps/tictac/src}"
FTP_DIR="${FTP_DIR:-/www/projects/tictac/}"

echo "🚀 Starting FTP upload (tictac)..."
echo "📁 Source: $SOURCE_DIR/"
echo "📁 Destination: $FTP_DIR"
echo ""

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source directory $SOURCE_DIR/ does not exist!"
  exit 1
fi

if [ -z "$(ls -A "$SOURCE_DIR" 2>/dev/null)" ]; then
  echo "⚠️  Source directory $SOURCE_DIR/ is empty!"
  exit 1
fi

if ! command -v lftp &> /dev/null; then
  echo "❌ lftp is not installed. Please install it (e.g. 'brew install lftp')."
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Uploading to FTP..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:charset utf8
mkdir -p $FTP_DIR
cd $FTP_DIR
lcd $SOURCE_DIR
mirror -R . . --verbose --exclude-glob .DS_Store
quit
EOF

result=$?

echo ""
if [ $result -eq 0 ]; then
  echo "✅ tictac upload successful."
  exit 0
else
  echo "❌ Error during tictac upload (code: $result)"
  exit 1
fi

