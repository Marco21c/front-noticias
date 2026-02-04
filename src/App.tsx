import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./pages/components/DefaultLayout";
import { Skeleton } from "./components/ui/skeleton";
import { AuthProvider } from "./contexts/AuthContext";
import { PanelProtectedRoute } from "./pages/components/PanelProtectedRoute";
import LoginPanel from "./pages/Panel/LoginPanel";
import { UserRole } from "./interfaces/User.roles";
import ManageUsers from "./pages/Panel/ManageUsers";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NewsCategory = lazy(() => import("./pages/NewsCategory"));
const News = lazy(() => import("./pages/News"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PanelUser = lazy(() => import("./pages/Panel/components/PanelUser"));
const DashboardPanel = lazy(() => import("./pages/Panel/DashboardPanel"));
const UpdateNew = lazy(() => import("./pages/Panel/UpdateNew"));
const EditNew = lazy(() => import("./pages/Panel/EditNew"));
const AddNew = lazy(() => import("./pages/Panel/AddNew"));
const UpdateCategory = lazy(() => import("./pages/Panel/UpdateCategory"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "category/:id", element: <NewsCategory /> },
      { path: "news/:slug", element: <News /> },
      { path: "*", element: <NotFound /> }
    ]
  },
  {
    path: "panel",
    children: [
      // Login sin protección
      { index: true, element: <LoginPanel /> },

      // Rutas protegidas
      {
        path: "",
        element: (
          <PanelProtectedRoute>
            <PanelUser />
          </PanelProtectedRoute>
        ),
        children: [
          // Dashboard accesible para todos los autenticados
          {
            path: "dashboard",
            element: <DashboardPanel />
          },

          // Solo SUPERADMIN puede gestionar usuarios
          {
            path: "users",
            element: (
              <PanelProtectedRoute allowedRoles={[UserRole.SUPERADMIN]}>
                <ManageUsers />
              </PanelProtectedRoute>
            )
          },

          // EDITOR, ADMIN y SUPERADMIN pueden gestionar noticias
          {
            path: "news",
            element: (
              <PanelProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPERADMIN]}>
                <UpdateNew />
              </PanelProtectedRoute>
            )
          },
          {
            path: "edit/:id",
            element: (
              <PanelProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPERADMIN]}>
                <EditNew />
              </PanelProtectedRoute>
            )
          },
          {
            path: "new",
            element: (
              <PanelProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPERADMIN]}>
                <AddNew />
              </PanelProtectedRoute>
            )
          },

          // Categorías (ajusta los roles según necesites)
          {
            path: "categories",
            element: (
              <PanelProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
                <UpdateCategory />
              </PanelProtectedRoute>
            )
          },

          { path: "*", element: <NotFound /> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="space-y-3 mt-10">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
