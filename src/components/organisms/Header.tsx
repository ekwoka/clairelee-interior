import { Icon } from 'solid-heroicons';
import { bars_3 } from 'solid-heroicons/solid';

import { A } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';

import { classNames } from '../../utils/classNames';

export const Header: Component = () => {
  const [atTop, setAtTop] = createSignal(true);
  const [menuIsOpen, setMenuIsOpen] = createSignal(false);
  const headerOnMount = (el: HTMLElement) => {
    let raf: number | null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty(
          '--tw-bg-opacity',
          Math.min(0.7, window.scrollY / 200).toFixed(2)
        );
        el.style.setProperty(
          '--tw-backdrop-blur',
          `blur(${Math.min(4, window.scrollY / 20).toFixed(1)}px)`
        );
        setAtTop(window.scrollY < 100);
        raf = null;
      });
    });
  };
  return (
    <>
      <div
        class={classNames(
          'fixed inset-0 bg-black transition-colors duration-1000 md:hidden',
          menuIsOpen() ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        )}
        onClick={() => setMenuIsOpen(false)}
      />
      <header
        ref={headerOnMount}
        class={classNames(
          'w-full sticky top-0 transition-all bg-neutral-100 duration-700 p-4 backdrop-filter z-10',
          atTop() ? 'shadow-none' : 'shadow-md',
          menuIsOpen() && '!bg-opacity-100 !bg-neutral-50'
        )}
        style="--tw-bg-opacity:0; --tw-backdrop-blur:blur(0px);">
        <div class="max-w-screen-md mx-auto flex justify-between relative items-center gap-16 px-4">
          <nav class="flex-1 hidden md:flex flex-row gap-8 justify-end">
            <A href="/projects">Projects</A>
            <span>About</span>
          </nav>
          <h1 class="flex-none flex flex-col items-center uppercase font-serif">
            <span class="text-xl md:text-3xl border-b border-black px-2 md:px-4">
              Claire Lee
            </span>
            <span class="text-md md:text-lg tracking-widest">Interior</span>
          </h1>
          <nav class="flex-1 hidden md:flex flex-row gap-8 justify-st art">
            <span>Contact</span>
            <span>LinkedIn</span>
          </nav>

          <button
            type="button"
            onClick={() => setMenuIsOpen(!menuIsOpen())}
            class="p-2 md:hidden">
            <Icon path={bars_3} class="w-6 h-6" />
            <span class="sr-only">{menuIsOpen() ? 'Close' : 'Open'} menu</span>
          </button>
        </div>
        <nav
          class={classNames(
            'md:hidden absolute bg-neutral-50 top-full inset-x-0 flex flex-col gap-2 p-4 items-center transition-all duration-700 shadow-md',
            menuIsOpen() ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}>
          <button type="button">Projects</button>
          <button type="button">About Me</button>
          <button type="button">CV</button>
        </nav>
      </header>
    </>
  );
};
