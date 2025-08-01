import AddUser from "./addUser/AddUser";
import "./App.css";
import User from "./getUser/User";
import UpdateUser from "./updateUser/UpdateUser";
import Navbar from "./Navbar";
// import AddUser from "./addUser/AddUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    },
  ]);

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
