#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const storybookStaticDir = join(process.cwd(), 'storybook-static');
const indexPath = join(storybookStaticDir, 'index.html');

try {
  let html = readFileSync(indexPath, 'utf-8');
  
  // Vérifier si la balise <base> existe déjà
  if (html.includes('<base')) {
    console.log('⚠️  La balise <base> existe déjà dans index.html');
    return;
  }
  
  // Ajouter la balise <base> juste après <head>
  html = html.replace(
    /<head>/i,
    '<head>\n  <base href="/projects/wui/">'
  );
  
  writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Balise <base> ajoutée avec succès dans index.html');
} catch (error) {
  console.error('❌ Erreur lors de la modification de index.html:', error.message);
  process.exit(1);
}
