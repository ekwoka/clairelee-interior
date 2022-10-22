import { Component, createSignal } from 'solid-js';

import { classNames } from '../../utils/classNames';

export const Header: Component = () => {
  const [atTop, setAtTop] = createSignal(true);
  const [menuIsOpen, setMenuIsOpen] = createSignal(false);
  let raf: number | null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(
      () => (setAtTop(window.scrollY < 100), (raf = null))
    );
  });
  return (
    <header
      class={classNames(
        'w-full sticky top-0 transition-colors bg-neutral-400 duration-1000 p-4',
        atTop() ? 'bg-opacity-0' : 'bg-opacity-70',
        menuIsOpen() && '!bg-opacity-100 !bg-neutral-50'
      )}>
      <div class="max-w-screen-md mx-auto flex justify-between relative">
        <h1 class="text-xl">Claire Lee</h1>
        <button
          type="button"
          onClick={() => setMenuIsOpen(!menuIsOpen())}
          class="">
          Menu
        </button>
      </div>
      <nav
        class={classNames(
          'absolute bg-neutral-50 top-full inset-x-0 flex flex-col gap-2 p-4 items-center transition-all duration-1000',
          menuIsOpen() ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}>
        <button type="button">Projects</button>
        <button type="button">About Me</button>
        <button type="button">CV</button>
      </nav>
    </header>
  );
};
