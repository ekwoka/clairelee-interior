import { projects } from 'virtual:all-projects';

import { ProjectCard } from '@atoms';

export const Projects = () => (
  <main class="max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] md:px-4 md:gap-4">
    {projects.map((project) => (
      <ProjectCard id={project.id} title={project.title} />
    ))}
  </main>
);
