
import Navbar from './navbar'
// import Footer from './footer'
import {INavItem} from '../typings'

export default function Layout({header, children}: { header: {navItems: INavItem[] }, children: JSX.Element | JSX.Element[]}) {
  return (<>
      <Navbar navItems={header.navItems}/>
      <main className="h-screen mx-8 md:mx-24">
      {children}
      </main>
    </>
  )
}