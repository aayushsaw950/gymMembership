import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hero from './components/Hero.jsx'
import { Membership } from './components/Membership.jsx'
import About from './components/About.jsx'
import { createBrowserRouter, RouterProvider , createRoutesFromElements, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Hero />} />
      <Route path='membership' element={<Membership />} />
      <Route path='about' element={<About />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   <RouterProvider router ={router}/>
    </AuthProvider>
  </StrictMode>,
)
