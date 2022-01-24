import Link from 'next/link'

export default function ServiceDisplay() {
  return (
    <div className="mx-auto w-1/1 flex flex-wrap justify-center mb-24">
          <Link href="/adminly">
            <a className="rounded w-80 h-20 bg-green-300 text-4xl flex justify-center items-center">Adminly</a>
          </Link>
          <Link href="/caringly">
            <a className="rounded w-80 h-20 bg-blue-300 mx-4 text-4xl flex justify-center items-center">Caringly</a>
          </Link>
          <Link href="/metaland">
            <a className="rounded w-80 h-20 bg-red-300 text-4xl flex justify-center items-center">Metaland</a>
          </Link>
    </div>
  )
}