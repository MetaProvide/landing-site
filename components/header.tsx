export default function Header({children}: {children: JSX.Element}) { 
  return (<h1 className="text-2xl lg:text-6xl md:leading-snug tracking-tighter f-f-l font-black text-center">{children}</h1>)
}
