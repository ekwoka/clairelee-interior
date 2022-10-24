import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

import { MDX, virtualProjectsIndex } from './plugins/vite-plugin-markdown';

export default defineConfig({
  plugins: [solidPlugin(), MDX(), tsconfigPaths(), virtualProjectsIndex()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
