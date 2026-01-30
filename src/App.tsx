import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./pages/components/DefaultLayout";
import { Skeleton } from "./components/ui/skeleton";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./pages/components/ProtectedRoute";

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NewsCategory = lazy(() => import("./pages/NewsCategory"));
const PanelUser = lazy(() => import("./pages/Panel/PanelUser"));
const DashboardPanel = lazy(() => import("./pages/Panel/DashboardPanel"));
const UpdateNew = lazy(() => import("./pages/Panel/UpdateNew"));
const AddNew = lazy(() => import("./pages/Panel/AddNew"));
const UpdateCategory = lazy(() => import("./pages/Panel/UpdateCategory"));
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
          element: <NewsCategory />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: "panel/",
      element:
        <ProtectedRoute>
          <PanelUser />
        </ProtectedRoute>,
      children: [
        {
          index: true,
          element: <DashboardPanel />
        },
        {
          path: "news",
          element: <UpdateNew />
        },
        {
          path: "new",
          element: <AddNew />
        },
        {
          path: "categories",
          element: <UpdateCategory />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },

  ]
);

function App() {

  return (
    <AuthProvider>
      <Suspense fallback={<div className="space-y-3 mt-10">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>

  );
};

export default App;