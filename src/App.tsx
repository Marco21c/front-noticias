
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./pages/components/DefaultLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export const router = createBrowserRouter(
[
  { path: "/",
    element: <DefaultLayout/> ,
    children: [
      { index: true,
        element: <Home/>
       },
       { path: "*",
         element: <NotFound/>
       }
    ]
   }
]
);
 
function App() {
  return (
    <RouterProvider router={router}/>
  );
};
 
export default App;