import Link from 'next/link'
import Image from 'next/image'
import {INavItem} from '../typings'

const NavItem = ({href, label}: {href: string, label: string}) => (
  <Link href={href}>
  <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
    {label}
  </a>
</Link>)

const Hamburger = () => (<button className='inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'>
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

export default function Navbar({navItems} : { navItems: INavItem[]}) {

    console.log('arrived', navItems)
    return (
    <nav className='flex items-center justify-between p-3'>
      <Link href='/home'>
                <a className='inline-flex items-center p-2 mr-4'>
          <Image src={'/assets/images/logo.png'} width="300" height="150" alt='logo of metaprovide' />
          </a>
      </Link>

      <div className="flex justify-between">
        {navItems.map(item => <NavItem key={item.key} href={item.href} label={item.label}/>)}
      </div>
      
      <Hamburger />
    </nav>
    )
}