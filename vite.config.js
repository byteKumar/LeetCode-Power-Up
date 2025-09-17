import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: 'src/content.js'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' },
        { src: 'src/style.css', dest: '.' }
      ]
    })
  ]
});