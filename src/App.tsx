import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./pages/components/DefaultLayout";
import { Skeleton } from "./components/ui/skeleton";

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NewsCategory = lazy(() => import("./pages/NewsCategory"));
const Register = lazy(() => import("./pages/Register"));
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
          path: "category/:id",
          element: <NewsCategory/>
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

    <Suspense fallback={<div className="space-y-3 mt-10">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>}>
    <RouterProvider router={router}/>
    </Suspense>
  );
};

export default App;