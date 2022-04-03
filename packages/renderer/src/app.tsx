import '@/global.css';
import { Component, createEffect } from "solid-js";
import { useRoutes, useNavigate } from "solid-app-router";
import { fetchStoredUid } from '@/api';

import { routes } from "./routes";

const App: Component = () => {
  const Route = useRoutes(routes);
  const navigate = useNavigate();

  createEffect(async () => {
    const { uid } = await fetchStoredUid();
    if (!uid) {
      navigate('/login');
    }
  });

  return (
    <main className="w-full h-full">
      <Route />
    </main>
  );
};

export default App;
