import Image from 'next/image';

export default function ResponsiveImage({alt, src, ...rest}: {alt:string; src:string; }) { 

  const correctedSrc = src.includes('http') ? src : src.replace('..', '')
  return (
  <div className='col-span-1 row-span-2 relative w-full mx-auto h-96' >
    <Image alt={alt} layout="fill" objectFit='contain' src={correctedSrc} {...rest} />
  </div>
)
}

