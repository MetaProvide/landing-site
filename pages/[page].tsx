import { getPageContent, getAllPageFiles, getAllNavigationItems, getImageFolder } from '../lib/api';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Layout from '../components/layout'
import Header from '../components/header'
import Text from '../components/text'
import ResponsiveImage from '../components/responsiveImage'
import ContactForm from '../components/contactForm'
import NewsLetterForm from '../components/newsLetterForm'
import ServiceDisplay from '../components/serviceDisplay'
import { pageUrlToName } from '../utils'
import {INavItem, IImageData} from '../typings'
import { AppWrapper } from '../context/AppContext'

const components = {
	img: ResponsiveImage,
	h1: Header,
	p: Text,
	ContactForm: ContactForm,
	NewsLetterForm: NewsLetterForm,
	ServiceDisplay: ServiceDisplay
};

export default function Page(props: { header: { navItems: INavItem[]}, imageData: IImageData[], source: MDXRemoteSerializeResult }) {
	return (
		<AppWrapper imageData={props.imageData}>
		<Layout header={props.header}>
			<MDXRemote {...props.source} components={components} />
		</Layout>
		</AppWrapper>
	);
}

export async function getStaticPaths() {
	const pageFiles = await getAllPageFiles()

	// Get the paths we want to pre-render based on posts
	const paths = pageFiles.map((pageDir) => ({
		params: { page: pageUrlToName(pageDir.filename) }
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.

	return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps(paths: { params: { page: string } }) {
	const imageData= await getImageFolder()

	const basePath = paths.params.page === 'home' ? '' : `/${paths.params.page}`;
  const rawPageContent = await getPageContent(basePath + `/index.md`);
	const { content, data } = matter(rawPageContent);
	const navItems = await getAllNavigationItems()
	// Pass post data to the page via props
	return {
		props: {
			header: {
				navItems: navItems
			},
			imageData: imageData,
			source: await serialize(content),
			meta: data
		}
	};
}
