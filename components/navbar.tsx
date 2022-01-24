import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import { useAppContext } from '../context/AppContext'
import { INavItem, IContextState, IImageData } from '../typings'
import { useRouter } from 'next/router'

const NavItem = ({href, label}: {href: string, label: string}) => {
  const router = useRouter()
  const pageName = href.substr(1)
  return (
  <Link href={href}>
  <a className={`${router.query.page == pageName ? "bg-green-100" : ""} lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center hover:bg-green-600 hover:text-white`}>
    {label}
  </a>
  </Link>)
}

const HamburgerButton = ({handleClick}: {handleClick: React.MouseEventHandler<HTMLButtonElement>}) => (
      <button onClick={handleClick} className='visible md:hidden lg:hidden inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'>
          <svg
            className='w-6 h-6 stroke-black'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>)

const HamburgerMenu = ({active, navItems}: {active: boolean, navItems: INavItem[]}) => (
  <div className={`w-screen bg-slate-200 ${active ? '' : 'hidden'} md:hidden`}>
          <div className='lg:flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto'>
            {navItems.map(item => <NavItem key={item.key} href={item.href} label={item.label}/>)}
          </div>
    </div>
)

const DefaultMenu = ({navItems}: {navItems: INavItem[]}) => (
      <div className="w-screen hidden md:flex lg:w-full justify-end">
        {navItems.map(item => <NavItem key={item.key} href={item.href} label={item.label}/>)}
      </div>
)

const LogoMenuItem = ({logo} : {logo: IImageData | undefined}) => {
      return (
        <Link href='/home'>
            <a className='flex shrink-0 items-center p-2 mr-4 w-44'>
              <Image src={logo?.src || ''} width={logo?.dimensions.width} height={logo?.dimensions.height} alt='logo of metaprovide'/>
            </a>
        </Link>);
}

export default function Navbar({navItems} : { navItems: INavItem[]}) {
    const [active, setActive] = useState(false)
    const appContext: IContextState = useAppContext();

    const logoImage: IImageData | undefined = appContext.imageData.find(imgObj => imgObj.id === 'logo')

    const handleClick = () => {
      setActive(!active)
    };

    return (
    <nav className='flex items-center justify-between p-3 flex-wrap md:flex-nowrap lg:max-w-4xl mx-auto'>
      <LogoMenuItem logo={logoImage}/>
      <DefaultMenu navItems={navItems}/>
      <HamburgerButton handleClick={handleClick} />
      <HamburgerMenu active={active} navItems={navItems} />
    </nav>
    )
}