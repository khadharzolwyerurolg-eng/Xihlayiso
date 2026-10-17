import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Home from './pages/Home';
import Biography from './pages/Biography';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';


const router = createBrowserRouter([
{path: '/', element: <Home />},
{path: '/biography', element: <Navigate to="/gallery" replace />},
{path: '/biography/:id', element: <Biography />},
{path: '/gallery', element: <Gallery />},
{path: '/contact', element: <Contact />},

])
function App() {
  return (
    <div className="App">
      <div className="container-main">
        <RouterProvider router = {router} />
      </div>
    </div>
  );
}

export default App;
