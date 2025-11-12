import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './pages/Home.jsx'
import FindPartners from './pages/FindPartners.jsx'
import MyConnections from './pages/MyConnections.jsx'
import CreatePartnerProfile from './pages/CreatePartnerProfile.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import MyProfile from './pages/MyProfile.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import PartnerDetails from './pages/PartnersDetails.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path:"findPartners",
        Component: FindPartners
      },
      {
        path:"createPartnerProfile",
        element: <PrivateRoute><CreatePartnerProfile></CreatePartnerProfile></PrivateRoute>,
      },
      {
        path:"myConnections",
        element: <PrivateRoute><MyConnections></MyConnections></PrivateRoute>,
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "myProfile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
      },
      {
        path: "partners/:id",
        element: <PrivateRoute><PartnerDetails></PartnerDetails></PrivateRoute>,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>,
)
