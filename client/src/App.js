import './App.css';
import { useCallback, useEffect, useState } from "react"
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import XyCover from "./components/imgs/XyCover.png"
import { LoadingContext } from "./context/LoadingContext"
import Home from './pages/Home';
import Biography from './pages/Biography';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

const MINIMUM_LOADING_DURATION = 3000

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "biography", element: <Navigate to="/gallery" replace /> },
      { path: "biography/:id", element: <Biography /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <Contact /> },
    ],
  },
])

function RouteLayout() {
  return <Outlet />
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [pendingRequests, setPendingRequests] = useState(0)

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setIsLoading(false),
      MINIMUM_LOADING_DURATION
    )

    return () => window.clearTimeout(timeoutId)
  }, [])

  const beginLoading = useCallback(() => {
    setPendingRequests((count) => count + 1)
  }, [])

  const endLoading = useCallback(() => {
    setPendingRequests((count) => Math.max(0, count - 1))
  }, [])

  useEffect(() => {
    document.body.classList.toggle("loading-lock", isLoading)
    return () => document.body.classList.remove("loading-lock")
  }, [isLoading])

  return (
    <LoadingContext.Provider value={{ beginLoading, endLoading }}>
      <div className="App">
        <div className="container-main" aria-busy={isLoading || pendingRequests > 0}>
          <RouterProvider router = {router} />
          {isLoading && (
            <div className="loading-screen" role="status" aria-label="Carregando página">
              <img className="loading-screen-logo" src={XyCover} alt="" />
              <span className="loading-spinner" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </LoadingContext.Provider>
  );
}

export default App;
