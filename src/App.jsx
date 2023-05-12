;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    dashBoardLoader, 
    dashboardAction, 
    Dashboard, 
    ErrorPage, 
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
    errorPageElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashboardAction,
        errorPageElement: <ErrorPage />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorPageElement: <ErrorPage />,
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
        errorPageElement: <ErrorPage />,
      },
      {
        path: 'logout',
        action: logoutAction
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage/>
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
