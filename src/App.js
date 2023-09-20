import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from "react-router-dom";
import "./style.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Share from "./pages/share/Share";
import { Search } from "./pages/search/Search";

function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
      </div>
    </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>;
    }

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/", // Set the login page as the default route
      element: <Login />,
    },
    {
      path: "/", // Root path, which will render the login page
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/createpost",
          element: <Share />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;