import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="container layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
