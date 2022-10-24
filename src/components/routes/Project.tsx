import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

import { LazyMarkdown } from '../molecule/LazyMarkdown';

export const Project: Component = () => (
  <LazyMarkdown type="project" id={useParams().id} />
);
