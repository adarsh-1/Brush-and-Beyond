import React from 'react'
import Header from './UserHeader.jsx'
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