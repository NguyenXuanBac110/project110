import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminAdd from "./pages/Admin/Product/Add";
import AdminEdit from "./pages/Admin/Product/Edit";
import AdminList from "./pages/Admin/Product/List";
import ClientLayout from "./layouts/ClientLayout";
import Homepage from "./pages/Client/HomePage";
import ProductDetail from "./pages/Client/ProductDetail";
import Notfound from "./pages/Client/Notfound";
import Register from "./pages/Client/Register";
import { Login } from "@mui/icons-material";

const routeConfig = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "product/list",
        element: <AdminList />
      },
      {
        path: "product/add",
        element: <AdminAdd />
      },
      {
        path: "product/edit/:id",
        element: <AdminEdit />
      },
    ]
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "/not-found",
        element: <Notfound />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;
