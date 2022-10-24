import { A } from '@solidjs/router';

export const ProjectCard = ({ title, id }: ProjectCardProps) => (
  <A href={`/projects/${id}`} class="relative overflow-hidden">
    <img
      src="https://placekitten.com/800/450"
      alt=""
      class="object-cover w-full h-full"
    />
    <div class="flex justify-start items-end bg-gradient-to-tr from-neutral-800 via-neutral-800/30 to-transparent md:justify-center md:items-center absolute inset-0 md:bg-neutral-900/60 text-neutral-100 md:opacity-0 md:hover:opacity-100 md:backdrop-blur-0 md:hover:backdrop-blur-sm transition-all duration-500 p-8">
      <h1 class="text-3xl md:text-2xl uppercase text-left md:text-center">
        {title}
      </h1>
    </div>
  </A>
);

type ProjectCardProps = {
  title: string;
  id: string;
};
