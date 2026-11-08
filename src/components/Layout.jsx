import { Outlet } from 'react-router-dom'
import Header from './Header'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="container layout-main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
