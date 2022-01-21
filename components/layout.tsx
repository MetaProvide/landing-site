
import Navbar from './navbar'
// import Footer from './footer'
import {INavItem} from '../typings'

export default function Layout({header, children}: { header: {navItems: INavItem[] }, children: JSX.Element | JSX.Element[]}) {
  return (<>
      
      <main className="h-screen lg:mx-36">
      <Navbar navItems={header.navItems}/>
      {children}
      </main>
    </>
  )
}