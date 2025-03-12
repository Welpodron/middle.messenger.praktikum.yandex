import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname, './src'),
  build: {
    outDir: resolve(__dirname, './dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@icons': resolve(__dirname, './src/shared/icons'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@constants': resolve(__dirname, './src/shared/constants'),
      '@app/types': resolve(__dirname, './src/shared/types'),
    },
  },
});
