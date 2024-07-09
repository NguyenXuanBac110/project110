import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminAdd from "./pages/Admin/Product/Add";
import AdminEdit from "./pages/Admin/Product/Edit";
import AdminList from "./pages/Admin/Product/List";

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
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;
