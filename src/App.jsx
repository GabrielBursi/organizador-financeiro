;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dashBoardLoader, dashboardAction, Dashboard, Error, ExpensesPage, expensesLoader } from "./pages";
import { Main, mainLoader } from './layout'
import { logoutAction } from "./actions";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: 'expenses',
        element: <ExpensesPage/>,
        loader: expensesLoader,
      },
      {
        path: 'logout',
        action: logoutAction
      },
    ]
  },
  {
    path: '*',
    element: <Error/>
  }
])

function App() {
  return(
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  ) 
}

export default App;
