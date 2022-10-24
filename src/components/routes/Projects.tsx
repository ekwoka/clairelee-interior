import { projects } from 'virtual:all-projects';

import { A } from '@solidjs/router';

export const Projects = () => (
  <main class="max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] md:px-4 md:gap-4">
    {projects.map((project) => (
      <A
        href={`/projects/${project.id}`}
        class="text-center relative overflow-hidden">
        <img
          src="https://placekitten.com/800/450"
          alt=""
          class="object-cover w-full h-full"
        />
        <span class="absolute text-center">{project.title}</span>
      </A>
    ))}
  </main>
);
