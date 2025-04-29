import { Outlet } from "react-router"
import Header from "./Header"

function Layout() {
  return (
    <>
      <div className="sticky top-0 z-50 shadow-md">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout

