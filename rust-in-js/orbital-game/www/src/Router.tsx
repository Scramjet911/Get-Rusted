import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AnotherPage from "./AnotherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "another-page",
    element: <AnotherPage />,
  },
]);

export default router;
