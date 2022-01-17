export default function Text({ children }: { children: JSX.Element }) {
	return <h2 className="col-span-1 text-lg lg:text-2xl lg:leading-7 md:leading-10 f-f-r py-4 md:py-8">{children}</h2>;
}
