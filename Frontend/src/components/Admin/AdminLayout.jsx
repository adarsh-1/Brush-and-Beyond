import React from 'react'
import Header from './AdminHeader.jsx'
import Footer from '../Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout