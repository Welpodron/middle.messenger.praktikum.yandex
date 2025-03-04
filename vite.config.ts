import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  // TODO: Добавить поддержку resolve.alias, т.к уже становится кринж использовать огромные относительные пути
});
