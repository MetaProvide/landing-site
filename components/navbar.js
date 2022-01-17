import Link from 'next/link'
import Image from 'next/image'


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

export default function Navbar() {
    return (
    <nav className='flex items-center flex-wrap p-3 '>
      <Link href='/'>
                <a className='inline-flex items-center p-2 mr-4 '>
          <Image src={'/assets/images/logo.png'} width="200" height="100" alt='logo of metaprovide' />
          </a>
        </Link>

      <Hamburger />
    </nav>
    )
}