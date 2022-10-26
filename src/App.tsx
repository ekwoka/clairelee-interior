import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import { About, Home, Project, Projects } from '@routes';

import { Header } from '@organisms';

const App: Component = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={Project} />
      </Routes>
    </>
  );
};

export default App;
