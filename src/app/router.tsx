import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { PanelProtectedRoute } from "@/features/panel/routes/PanelProtectedRoute";
import LoginPanel from "@/features/panel/pages/LoginPanel";
import { USER_ROLES } from "@/features/auth/types/User.type";
import ManageUsers from "@/features/panel/pages/ManageUsers";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const Register = lazy(() => import("@/features/auth/pages/Register"));
const NewsCategory = lazy(() => import("@/features/news/pages/NewsCategory"));
const News = lazy(() => import("@/features/news/pages/News"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Newsletter = lazy(() => import("@/features/newsletter/pages/Newsletter"));
const AboutUs = lazy(() => import("@/pages/footer/AboutUs"));
const Policies = lazy(() => import("@/pages/footer/Policies"));
const TermsConditions = lazy(() => import("@/pages/footer/Terms"));
const Contact = lazy(() => import("@/pages/footer/Contact"));
const PanelUser = lazy(() => import("@/features/panel/components/PanelUser"));
const DashboardPanel = lazy(() => import("@/features/panel/pages/DashboardPanel"));
const UpdateNew = lazy(() => import("@/features/panel/pages/UpdateNew"));
const EditNew = lazy(() => import("@/features/panel/pages/EditNew"));
const AddNew = lazy(() => import("@/features/panel/pages/AddNew"));
const UpdateCategory = lazy(() => import("@/features/panel/pages/UpdateCategory"));
const SearchResults = lazy(() => import("@/features/news/pages/SearchResults"));
const EditCategory = lazy(() => import("@/features/panel/pages/EditCategory"));
const AddCategory = lazy(() => import("@/features/panel/pages/AddCategory"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "search", element: <SearchResults /> },
      { path: "category/:id", element: <NewsCategory /> },
      { path: "news/:slug", element: <News /> },
      { path: "terms-and-conditions", element: <TermsConditions /> },
      { path: "policies", element: <Policies /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "newsletter", element: <Newsletter /> },
      { path: "*", element: <NotFound /> }
    ]
  },

  {
    path: "/panel",
    element: <LoginPanel />
  },

  {
    path: "/panel",
    element: (
      <Suspense
        fallback={
          <div className="space-y-3 mt-10">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        }
      >
        <PanelProtectedRoute>
          <PanelUser />
        </PanelProtectedRoute>
      </Suspense>
    ),
    children: [
      { path: "dashboard", element: <DashboardPanel /> },

      {
        path: "users",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]}>
            <ManageUsers />
          </PanelProtectedRoute>
        )
      },

      {
        path: "news",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
            <UpdateNew />
          </PanelProtectedRoute>
        )
      },
      {
        path: "categories/:id/edit",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
            <EditCategory />
          </PanelProtectedRoute>
        )
      },
      { 
         path: "categories/new",
         element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}> 
            <AddCategory />
          </PanelProtectedRoute>
         )  
      },
      {
        path: "edit/:id",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
            <EditNew />
          </PanelProtectedRoute>
        )
      },

      {
        path: "new",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
            <AddNew />
          </PanelProtectedRoute>
        )
      },

      {
        path: "categories",
        element: (
          <PanelProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]}>
            <UpdateCategory />
          </PanelProtectedRoute>
        )
      },

      { path: "*", element: <NotFound /> }
    ]
  }
]);
