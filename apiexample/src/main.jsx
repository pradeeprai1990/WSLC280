import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails.jsx'
import MainContext from './context/MainContext.jsx'
let route=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/product-details/:pid',
    element:<ProductDetails/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
        <RouterProvider router={route}/>
    </MainContext>
  </StrictMode>,
)
