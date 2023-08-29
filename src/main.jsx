import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StartPage from "./routes/StartPage";
import ChatApp from "./routes/ChatApp";
import KnittingApp from "./routes/KnittingApp";
import ChatRPG from "./routes/ChatRPG";
import Settings from "./routes/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/chatapp",
    element: <ChatApp />,
  },
  {
    path: "/knitting",
    element: <KnittingApp />,
  },
  {
    path: "/chatRPG",
    element: <ChatRPG />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
);
