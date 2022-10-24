/* eslint-disable no-restricted-syntax */
import { readFile } from 'fs/promises';
import path from 'path';
import * as vite from 'vite';

import { parseFrontMatter } from './parseFrontMatter';

export const MDX = (): vite.Plugin => {
  return {
    name: 'solid-marked',
    enforce: 'pre',
    resolveId(id, importer) {
      if (
        /\.(md|mdx|markdown|mdown|mkdn|mkd|mkdown|ron)$/.test(id) &&
        importer
      ) {
        return path.join(path.dirname(importer), id);
      }
      if (
        /\.(md|mdx|markdown|mdown|mkdn|mkd|mkdown|ron)\.jsx$/.test(id) &&
        importer
      ) {
        return path.join(path.dirname(importer), id);
      }
      return null;
    },
    async load(id) {
      if (id.startsWith('\0')) {
        return null;
      }
      if (/\.(md|mdx|markdown|mdown|mkdn|mkd|mkdown|ron)$/.test(id)) {
        const { name, ext } = path.parse(id);
        return `export * from './${name}${ext}.jsx'`;
      }
      if (/\.(md|mdx|markdown|mdown|mkdn|mkd|mkdown|ron)\.jsx$/.test(id)) {
        const { dir, name } = path.parse(id);
        const target = path.join(dir, name);
        const content = await readFile(target, 'utf-8');
        const details = parseFrontMatter(content);
        return `import SolidMarkdown from 'solid-markdown';
        export const content = \`${content.replace(/---(.*\n)*---/, '')}\`;
        export const details = ${JSON.stringify(details)};
        export const Component = () => (
          <SolidMarkdown class="prose mx-auto">{content}</SolidMarkdown>
        )`;
      }
      return null;
    },
    handleHotUpdate(ctx) {
      if (!/\.(md|mdx|markdown|mdown|mkdn|mkd|mkdown|ron)$/.test(ctx.file)) {
        return;
      }
      const modules: vite.ModuleNode[] = [];
      for (const mod of ctx.modules) {
        for (const imported of mod.importedModules) {
          modules.push(imported);
        }
      }
      return modules;
    },
  };
};
