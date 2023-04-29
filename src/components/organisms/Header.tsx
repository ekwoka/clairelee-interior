import { Icon } from 'solid-heroicons';

import { A } from '@solidjs/router';
import { Component } from 'solid-js';

import { createBeacon } from '../../hooks';
import { classNames } from '../../utils/classNames';
import { bars_3 } from 'solid-heroicons/solid';

export const Header: Component = () => {
  const atTop = createBeacon(true);
  const menuIsOpen = createBeacon(false);
  const headerOnMount = (el: HTMLElement) => {
    let raf: number | null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty(
          '--tw-bg-opacity',
          Math.max(0, Math.min(0.7, window.scrollY / 200)).toFixed(2)
        );
        el.style.setProperty(
          '--tw-backdrop-blur',
          `blur(${Math.max(1, Math.min(4, window.scrollY / 20)).toFixed(1)}px)`
        );
        atTop(window.scrollY < 100);
        raf = null;
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  };
  return (
    <>
      <div
        class={classNames(
          'fixed inset-0 bg-black transition-colors duration-1000 md:hidden z-10',
          menuIsOpen() ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        )}
        onClick={() => menuIsOpen(false)}
      />
      <header
        ref={headerOnMount}
        class={classNames(
          'w-full sticky top-0 transition-all bg-neutral-100 duration-700 p-4 backdrop-filter z-10 hover:!bg-opacity-70 hover:!backdrop-blur-sm',
          atTop() ? 'shadow-none' : 'shadow-md',
          menuIsOpen() && '!bg-opacity-100 !bg-neutral-50'
        )}
        style="--tw-bg-opacity:0; --tw-backdrop-blur:blur(0px);">
        <div class="max-w-screen-md mx-auto flex justify-between relative items-center gap-16 px-4">
          <nav class="flex-1 hidden md:flex flex-row gap-8 justify-end">
            <A href="/projects">Projects</A>
            <A href="/about">About</A>
          </nav>
          <A href="/" class="flex-none">
            <h1 class="flex-none flex flex-col items-center uppercase font-serif">
              <span class="text-xl md:text-3xl border-b border-black px-2 md:px-4">
                Claire Lee
              </span>
              <span class="text-md md:text-lg tracking-widest">Interior</span>
            </h1>
          </A>
          <nav class="flex-1 hidden md:flex flex-row gap-8 justify-st art">
            <span>Contact</span>
            <span>LinkedIn</span>
          </nav>

          <button
            type="button"
            onClick={() => menuIsOpen(!menuIsOpen())}
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
          <A href="/projects">Projects</A>
          <A href="/#">About Me</A>
          <A href="/#">CV</A>
        </nav>
      </header>
    </>
  );
};
