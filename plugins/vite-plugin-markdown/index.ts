/* eslint-disable no-restricted-syntax */
import path from 'path';
import * as vite from 'vite';

import { parseFrontMatter } from './parseFrontMatter';
import { readFile, readdir } from 'fs/promises';

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
        import { components } from '../../src/components/atoms';
        export const content = \`${content.replace(/---(.*\n)*---/, '')}\`;
        export const details = ${JSON.stringify(details)};
        export const Component = () => (
          <SolidMarkdown class="prose mx-auto" components={components}>{content}</SolidMarkdown>
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

export const virtualProjectsIndex = (): vite.Plugin => {
  const virtualModuleId = 'virtual:all-projects';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'all-projects', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = await readdir(
          path.join(process.cwd(), 'content', 'projects')
        );
        const promises = files.map<Promise<project>>(async (file) => {
          const { name, ext } = path.parse(file);
          const target = path.join(
            process.cwd(),
            'content',
            'projects',
            `${name}${ext}`
          );
          const content = await readFile(target, 'utf-8');
          const details = parseFrontMatter(content);
          return { ...details, id: name } as project;
        });

        return `export const projects = ${JSON.stringify(
          (await Promise.all(promises)).sort(
            (a, b) => Number(a.priority) - Number(b.priority)
          )
        )}`;
      }
    },
  };
};

type project = {
  priority: string;
  id: string;
};
