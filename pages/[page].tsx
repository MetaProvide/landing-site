import { getImageFolder, getPageContent, getAllPagesDirs } from '../lib/api';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Layout from '../components/layout';
import Header from '../components/header';
import Text from '../components/text';
import ResponsiveImage from '../components/responsiveImage';

const components = {
	img: ResponsiveImage,
	h1: Header,
	p: Text
};

export default function AdminlyPage(props: { source: MDXRemoteSerializeResult }) {
	return (
		<Layout>
			<MDXRemote {...props.source} components={components} />
		</Layout>
	);
}

export async function getStaticPaths() {
	const pageDirs = await getAllPagesDirs();

	// Get the paths we want to pre-render based on posts
	const paths = pageDirs.map((pageDir) => ({
		params: { page: pageDir.basename }
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: { page: string } }) {
	const rawPageContent = await getPageContent(`/${params.page}/index.md`);
	const { content, data } = matter(rawPageContent);

	// Pass post data to the page via props
	return {
		props: {
			source: await serialize(content),
			meta: data
		}
	};
}
