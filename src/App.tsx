import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import { Home, Project } from '@routes';

import { Header } from '@organisms';

const App: Component = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/projects/:id" component={Project} />
      </Routes>
    </>
  );
};

export default App;
