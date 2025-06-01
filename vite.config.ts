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
      '@helpers': resolve(__dirname, './src/shared/helpers'),
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@icons': resolve(__dirname, './src/shared/icons'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@modules': resolve(__dirname, './src/shared/modules'),
      '@controllers': resolve(__dirname, './src/shared/controllers'),
      '@api': resolve(__dirname, './src/shared/api'),
      '@constants': resolve(__dirname, './src/shared/constants'),
      '@app/types': resolve(__dirname, './src/shared/types'),
    },
  },
});
