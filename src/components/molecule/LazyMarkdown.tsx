import { Component as ComponentType, lazy } from 'solid-js';

import { Image } from '@atoms';

import { classNames } from '@utils';

export const LazyMarkdown = ({ type, id }: LazyMarkdownProps) => {
  const Markdown = lazy(async () => {
    const { Component, details } = await import(
      `../../../content/${type}s/${id}.md`
    );
    const mainImage = type === 'project' ? details.hero : details.image;
    return {
      default: (() => (
        <article
          class={classNames(
            'prose mx-auto p-4',
            mainImage && 'md:-mt-28 mt-0'
          )}>
          {mainImage && (
            <Image
              src={mainImage}
              class="min-w-[100vw] relative left-1/2 -translate-x-1/2"
            />
          )}
          {details.title && <h1>{details.title}</h1>}
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
