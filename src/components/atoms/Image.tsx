import { Component, JSX } from 'solid-js';

import { classNames, getRespSrc, getRespSrcSet } from '@utils';

export const Image: Component<ImageProps> = ({
  node: _,
  src,
  expand,
  class: className,
  ...props
}) => (
  <img
    loading="lazy"
    src={getRespSrc(src, 300)}
    srcset={getRespSrcSet(src)}
    class={classNames(
      className,
      expand &&
        'relative left-1/2 -translate-x-1/2 min-w-[100vw] md:min-w-[70vw]'
    )}
    {...props}
  />
);

type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  node?: Record<string, unknown>;
  src: string;
  expand?: boolean;
};
