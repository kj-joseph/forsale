import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("@/views/Home"));
const Jerseys = lazy(() => import("@/views/Jerseys"));

const router = createBrowserRouter(
    createRoutesFromElements(
		<Route path="/">
			<Route
				path="/jerseys/:itemId?"
				element={
                    <Suspense fallback={<>Loading app...</>}>
						<Jerseys />
					</Suspense>
				}
			/ >
			<Route
				index
				element={
                    <Suspense fallback={<>Loading app...</>}>
						<Home />
					</Suspense>
				}
			/>

		</Route>
	)

)

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
