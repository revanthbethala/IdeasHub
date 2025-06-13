import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import Ideas from "./pages/Ideas";
import ProtectedRoute from "./pages/ProtectedRoute";
import NavBar from "./components/NavBar";
import PostIdea from "./pages/PostIdea";
import Idea from "./pages/Idea";
import UpdateIdea from "./components/UpdateIdea";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/postIdea",
          element: <PostIdea />,
        },
        {
          path: "/ideas",
          element: (
            <ProtectedRoute>
              <Ideas />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ideas/:id",
          element: (
            <ProtectedRoute>
              <Idea />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ideas/:id/update",
          element: <UpdateIdea />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
