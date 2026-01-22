import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./pages/components/DefaultLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ]
);

function App() {

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;