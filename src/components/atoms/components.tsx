import { Image } from './Image';

export const components = {
  img: (props: Parameters<typeof Image>[0]) => (
    <Image {...props} expand={true} />
  ),
};
