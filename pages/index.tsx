import {getImageFolder, getPageContent} from '../lib/api'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Layout from '../components/layout'
import ContactForm from '../components/contactForm'
import Header from '../components/header'
import Text from '../components/text'
import ResponsiveImage from '../components/responsiveImage';

const components = {
  img: ResponsiveImage,
  h1: Header,
  p: Text,
  ContactForm
}

function Homepage(props: {source: MDXRemoteSerializeResult}) {
  return (
      <Layout>
        <MDXRemote {...props.source} components={components} />
      </Layout>
      )
}


export async function getServerSideProps() {
  await getImageFolder()
  const rawPageContent = await getPageContent('/index.md')
  const {content, data} = matter(rawPageContent)
  return {
      props: {
        source: await serialize(content),
        meta: data,
      },
  };
}

export default Homepage
