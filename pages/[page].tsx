import { getPageContent, getAllPageFiles, getAllNavigationItems } from '../lib/api';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Layout from '../components/layout'
import Header from '../components/header'
import Text from '../components/text'
import ResponsiveImage from '../components/responsiveImage'
import ContactForm from '../components/ContactForm'
import { capitalizeFirstLetter, pageUrlToName } from '../utils'
import {INavItem} from '../typings'

const components = {
	img: ResponsiveImage,
	h1: Header,
	p: Text,
	ContactForm: ContactForm
};

export default function Page(props: { header: { navItems: INavItem[]}, source: MDXRemoteSerializeResult }) {
	return (
		<Layout header={props.header}>
			<MDXRemote {...props.source} components={components} />
		</Layout>
	);
}

export async function getStaticPaths() {
	const pageFiles = await getAllPageFiles();

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
			source: await serialize(content),
			meta: data
		}
	};
}
