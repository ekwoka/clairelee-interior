import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

import { MDX, virtualProjectsIndex } from './plugins/vite-plugin-markdown';

export default defineConfig({
  plugins: [
    solidPlugin(),
    MDX(),
    tsconfigPaths(),
    virtualProjectsIndex(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/static/images/transformed/*',
          dest: 'images',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
