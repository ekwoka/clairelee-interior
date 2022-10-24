import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import { Home } from './components/routes';

import { Header } from './components/organisms';

const App: Component = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </>
  );
};

export default App;
