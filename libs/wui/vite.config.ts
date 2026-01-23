import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { Plugin } from 'vite';

// Plugin to generate CSS bundle from wui.css with resolved imports
function generateCssBundle(): Plugin {
  return {
    name: 'generate-css-bundle',
    async writeBundle() {
      const cssPath = resolve(__dirname, 'src/styles/wui.css');
      const outputPath = resolve(__dirname, 'dist/wui.css');
      const tokensPath = resolve(__dirname, 'src/styles/tokens.css');
      const buttonCssPath = resolve(__dirname, 'src/components/WuiButton/WuiButton.css');
      
      try {
        // Read all CSS files
        const tokens = readFileSync(tokensPath, 'utf-8');
        const buttonCss = readFileSync(buttonCssPath, 'utf-8');
        
        // Combine all CSS (tokens first, then component styles)
        const bundledCss = `${tokens}\n\n${buttonCss}`;
        
        writeFileSync(outputPath, bundledCss, 'utf-8');
      } catch (error) {
        console.error('Error generating CSS bundle:', error);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), generateCssBundle()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WUI',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Single bundle instead of preserving modules structure
        entryFileNames: '[name].js',
      },
    },
  },
});
