import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Clientes from './pages/Clientes.jsx'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import LayoutLogin from './components/LayoutLogin.jsx'
import Registrar from './pages/Registrar.jsx'
import OlvidePassword from './pages/OlvidePassword.jsx'
import EditarCliente from './pages/EditarCliente.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import ConfirmarCuenta from './pages/ConfirmarCuenta.jsx'
import { ClienteProvider } from './providers/ClientesProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Index />,
      },
      {
        path: '/clientes',
        element: <Clientes />
      },
      {
        path: '/clientes/:id',
        element: <Clientes />
      },
      {
        path: '/editar-cliente/:id',
        element: <EditarCliente />
      }
    ],

  },
  {
    path: '/',
    element: <LayoutLogin />,
    children: [
      {
        path: '/login',
        index: true,
        element: <Login />
      }, {
        path: '/registrar',
        element: <Registrar />
      },
      {
        path: '/olvide-password',
        element: <OlvidePassword />
      },
      {
        path: '/confirmar-cuenta/:token',
        element: <ConfirmarCuenta />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ClienteProvider>
        <RouterProvider router={router} />
      </ClienteProvider>
    </AuthProvider>
  </React.StrictMode>,
)
