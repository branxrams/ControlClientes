import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Layout from './components/Layout';
import NuevoCliente, { action as actionCliente } from './pages/NuevoCliente';
import Index, {loader as clientesLoader} from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarClientes, {loader as editarClientesLoader, action as editarClientesAction}from './pages/EditarClientes';
import { action as eliminarClienteAction} from './components/Cliente'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: actionCliente,
        errorElement: <ErrorPage/>
      },
      {
        path: '/cliente/:id/editar',
        element: <EditarClientes/>,
        loader: editarClientesLoader,
        action: editarClientesAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:id/eliminar',
        action: eliminarClienteAction,
      }
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
