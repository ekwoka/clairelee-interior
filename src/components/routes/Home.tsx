import { Image } from '@atoms';

import { details } from '../../../content/pages/home.md';

export const Home = () => (
  <main class="px-4 flex-auto">
    <Image
      src={Array.isArray(details.image) ? details.image[0] : details.image}
      class="fixed inset-0 w-full h-full object-cover"
      sizes="200vh"
    />
  </main>
);
