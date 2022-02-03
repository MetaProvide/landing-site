
import { useAppContext } from '../context/AppContext'
import { IContextState, IImageData } from '../typings'

export default function Text({ children }: { children: JSX.Element }) {
	const appContext: IContextState = useAppContext();
	const backgroundImages: IImageData[] | undefined = appContext.imageData.filter(imgObj => imgObj.id.includes('watercolor'))
	const selectedBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
	
	const randNumbFrom = (min: number, max: number) => Math.random() * (max - min) + min;

	const placementY = `${randNumbFrom(-30, 30)}%`
	const placementX = `${randNumbFrom(-50, 90)}%`
	const styles = { top: placementY, right: placementX}
	return (
	<p className="relative mx-auto max-w-screen-lg text-md lg:text-large lg:leading-7 md:leading-10 f-f-r py-4 mt-4 mb-8 z-2">
		<img unselectable="on" className={`absolute z-1`} style={styles} src={selectedBackgroundImage.src} />
		{children}
	</p>);
}
