;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    dashBoardLoader, 
    dashboardAction, 
    Dashboard, 
    Error, 
    ExpensesPage, 
    expensesLoader, 
    expensesAction, 
    BudgetPage, 
    budgetAction, 
    budgetLoader 
  } from "./pages";
import { Main, mainLoader } from './layout'
import { logoutAction, deleteBudget } from "./actions";

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
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: 'expenses',
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
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
