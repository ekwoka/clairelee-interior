import { Component as ComponentType, lazy } from 'solid-js';

export const LazyMarkdown = ({ type, id }: LazyMarkdownProps) => {
  const Markdown = lazy(async () => {
    const { Component, details } = await import(
      `../../../content/${type}s/${id}.md`
    );
    return {
      default: (() => (
        <article class="prose mx-auto">
          <h1>{details.title}</h1>
          <p>{details.location}</p>
          <Component />
        </article>
      )) as ComponentType,
    };
  });
  return <Markdown />;
};

type LazyMarkdownProps = {
  type: 'project' | 'page';
  id: string;
};
