declare module '*.md' {
  import { Component as ComponentType } from 'solid-js';
  export const content: string;
  export const details: Record<string, string | string[]>;
  export const Component: ComponentType;
}

declare module 'virtual:all-projects' {
  export const projects: Record<string, string>[];
}
