import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Home from './pages/Home.jsx'
import FindPartners from './pages/FindPartners.jsx'
import MyConnections from './pages/MyConnections.jsx'
import CreatePartnerProfile from './pages/CreatePartnerProfile.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import AdminProvider from './contexts/AdminContext.jsx'
import { ToastContainer } from 'react-toastify'
import MyProfile from './pages/MyProfile.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import PartnerDetails from './pages/PartnersDetails.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import DashboardOverview from './pages/dashboard/DashboardOverview.jsx'
import DashboardProfile from './pages/dashboard/DashboardProfile.jsx'
import DashboardCreateProfile from './pages/dashboard/DashboardCreateProfile.jsx'
import DashboardConnections from './pages/dashboard/DashboardConnections.jsx'
import AdminOverview from './pages/dashboard/admin/AdminOverview.jsx'
import ManageUsers from './pages/dashboard/admin/ManageUsers.jsx'
import ManagePartners from './pages/dashboard/admin/ManagePartners.jsx'
import Blog from './pages/Blog.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout></RootLayout>,
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
      {
        path:"about",
        Component: AboutUs
      },
      {
        path: "contact",
        Component: Contact
      },
      {
        path: "blog",
        Component: Blog
      },
      {
        path: "*",
        Component: NotFoundPage,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardOverview
      },
      {
        path: "profile",
        Component: DashboardProfile
      },
      {
        path: "create-profile",
        Component: DashboardCreateProfile
      },
      {
        path: "connections",
        Component: DashboardConnections
      },
      {
        path: "admin",
        Component: AdminOverview,
        exact: true
      },
      {
        path: "admin/users",
        Component: ManageUsers
      },
      {
        path: "admin/partners",
        Component: ManagePartners
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AdminProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </AdminProvider>
    </AuthProvider>
  </StrictMode>,
)
