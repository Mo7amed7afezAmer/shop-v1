import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import style files
import "bootstrap/dist/css/bootstrap.css";
import "./assets/sass/main.scss";

// import pages
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Department from "./pages/department";
import Login from "./pages/login";
import NotImplementedPage from "./pages/notImplementedPage";

const NotFound = () => <h1>not found page</h1>

// create router
const routes = [
  {
    path: "/",
    element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/department", element: <Department /> },
      { path: "/item", element: <NotImplementedPage /> },
      { path: "/cart", element: <NotImplementedPage /> },
      { path: "/customer", element: <NotImplementedPage /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
  {
    path: "/profile",
    element: <NotImplementedPage />,
  },
  {
    path: "/login",
    element: <Login />,
  }
];
const router = createBrowserRouter(routes, {
  basename: "/admin-v1"
});

window.addEventListener("click", () => {
  // document.getElementById("settingsColorBox").classList.remove("show-settings-color");
});

function App() {
  return (
    <div className="App">
      <RouterProvider router = { router } />
    </div>
  );
}

export default App;
