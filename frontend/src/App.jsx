import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Lazy imports
const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/auth/Login'))
const Signup = lazy(() => import('./components/auth/Signup'))
const Jobs = lazy(() => import('./components/Jobs'))
const Browse = lazy(() => import('./components/Browse'))
const Profile = lazy(() => import('./components/Profile'))
const JobDescription = lazy(() => import('./components/JobDescription'))

// Admin routes
const Companies = lazy(() => import('./components/admin/Companies'))
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'))
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'))
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'))
const PostJob = lazy(() => import('./components/admin/PostJob'))
const Applicants = lazy(() => import('./components/admin/Applicants'))

// Static pages
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const FAQ = lazy(() => import('./components/FAQ'))
const Terms = lazy(() => import('./components/Terms'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/description/:id', element: <JobDescription /> },
  { path: '/browse', element: <Browse /> },
  {
    path: '/profile',
    element: <ProtectedRoute allowedRoles={["student"]}><Profile /></ProtectedRoute>
  },
  // Admin routes
  {
    path: '/admin/companies',
    element: <ProtectedRoute allowedRoles={["recruiter"]}><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute allowedRoles={["recruiter"]}><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute allowedRoles={["recruiter"]}><PostJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute allowedRoles={["recruiter"]}><Applicants /></ProtectedRoute>
  },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <PrivacyPolicy /> }
])

function App() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-lg">Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  )
}

export default App
