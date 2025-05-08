import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"
import Assess from './pages/Assess.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "assess",
    element: <Assess/>,
  },
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
