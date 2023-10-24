import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ListSharedVideos from "../pages/ListSharedVideos";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.LIST_SHARED_VIDEOS,
        element: <ListSharedVideos />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
  { path: ROUTES.ERROR, element: <NotFound /> },
]);
