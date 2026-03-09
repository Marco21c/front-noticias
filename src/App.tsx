import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Providers } from "./app/providers";
import { Skeleton } from "./shared/components/ui/skeleton";

function App() {
  return (
    <Providers>
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
    </Providers>
  );
}

export default App;
