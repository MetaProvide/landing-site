import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import { IContextState } from '../typings';

export default function ResponsiveImage({alt, src, ...rest}: {alt: string; src: string; }) { 
  const appContext: IContextState = useAppContext();

  const imagePathFromCms = src.includes('http') ? src : src.replace('..', '')
  let selectedImage = {src: imagePathFromCms, dimensions: {width: 480, height: 640} }
  if (!src.includes('http') ) {
    const splitted = imagePathFromCms.split('/')
    const id = splitted[splitted.length - 1].split('.')[0]
    selectedImage = appContext.imageData.find(imgObj => imgObj.id === id)
  }
  return selectedImage ? <Image layout="responsive" alt={alt} src={selectedImage?.src} width={selectedImage?.dimensions.width} height={selectedImage?.dimensions.height} {...rest} /> : 'Incorrect Image'

}

