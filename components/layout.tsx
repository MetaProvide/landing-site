
import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({children}: {children: JSX.Element | JSX.Element[]}) {
  return (<>
      <Navbar />
      <main className="h-screen grid grid-cols-1 lg:mx-48">{children}</main>
    </>
  )
}