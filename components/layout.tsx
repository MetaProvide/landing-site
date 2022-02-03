
import Navbar from './navbar'
// import Footer from './footer'
import {INavItem} from '../typings'

export default function Layout({header, children}: { header: {navItems: INavItem[] }, children: JSX.Element | JSX.Element[]}) {
    return (<>
      <main className="h-full mx-4 sm:mx-16 md:mx-24 lg:mx-72 bg-white p-5 z-0">
      <Navbar navItems={header.navItems}/>
      {children}
      </main>
    </>
  )
}