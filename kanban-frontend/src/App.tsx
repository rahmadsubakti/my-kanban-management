import { useEffect } from "react";

import "./App.scss";

import router from "./utils/route";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Main() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function App() {
  useEffect(() => {
    const root = document.querySelector('html');
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
      root?.setAttribute('data-theme', 'light')
    } else {
      const theme = localStorage.getItem('theme')
      root?.setAttribute('data-theme', theme!);
    }
  }, []);

  return <Main />
}

export default App;
