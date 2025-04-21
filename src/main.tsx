import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { MainTable } from "./pages/MainTable";
import { createBrowserRouter, RouterProvider } from "react-router";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Login } from "./pages/Login";

import { Navbar } from "./pages/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { setupInterceptors } from "./utils/urls";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <MainTable /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
setupInterceptors();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
