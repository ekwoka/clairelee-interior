import { projects } from 'virtual:all-projects';

import { A } from '@solidjs/router';

export const Projects = () => (
  <main class="prose mx-auto">
    {projects.map((project) => (
      <A href={`/projects/${project.id}`}>{project.title}</A>
    ))}
  </main>
);
