import path from 'path'
import fs from 'fs'
import { createClient, WebDAVClient, BufferLike, FileStat, ResponseDataDetailed } from "webdav"
// 5 high severity vulnerabilities, but just slowdown they are OK for now
import { ensureDirectoryExistence, pageUrlToName, capitalizeFirstLetter } from '../utils';

const CONNECT_URL = process.env.NEXT_PUBLIC_NEXTCLOUD_CONNECT_URL || 'unset';
const USERNAME = process.env.NEXT_PUBLIC_NEXTCLOUD_USER || 'unset';
const PASSWORD = process.env.NEXT_PUBLIC_NEXTCLOUD_PASSWORD || 'unset';
const CMS_ROOT = process.env.NEXT_PUBLIC_NEXTCLOUD_ROOT_CMS || 'unset';
const ASSETS_PATH = 'public/assets/'
const ASSETS_IMAGE_PATH = 'public/assets/images/'

const webdavErrorMessageReadingDirectory = 'This is the WebDAV interface. It can only be accessed by WebDAV clients such as the Nextcloud desktop sync client.'

const client: WebDAVClient = createClient(CONNECT_URL
  , {
    username: USERNAME,
    password: PASSWORD
  }
);

export async function getImageFolder() {
  const source = path.join(CMS_ROOT, `assets/images`)

  ensureDirectoryExistence(ASSETS_PATH)
  console.log(`Ensuring ${ASSETS_PATH} exists`)

  ensureDirectoryExistence(ASSETS_IMAGE_PATH)
  console.log(`Ensuring ${ASSETS_IMAGE_PATH} exists`)

  const files = await client.getDirectoryContents(source, { deep: true, glob: "/**/*.{png,jpg,gif}" })
  if (!Array.isArray(files)) {
    throw new Error(`Did not receive files from ${source}`)
  }

  await Promise.all(files.map(async (file: FileStat) => {
    const image: string | BufferLike | ResponseDataDetailed<string | BufferLike>  = await client.getFileContents(file.filename)

    // TODO figure out size of image 
    const destination = path.join(ASSETS_IMAGE_PATH, file.basename)
    if (!fs.existsSync(destination)) {
      fs.writeFileSync(destination, (image as string), {});
      console.log(`${file.basename} written to ${destination}`)
    } else {
      console.log(`${file.basename} already exists`)
    }
  }))

}

export async function getPageContent(relativePath: string): Promise<string> {
  const contentPath = path.join(CMS_ROOT, `content`)
  const target = path.join(contentPath, relativePath)
  const content: string | BufferLike | ResponseDataDetailed<string | BufferLike> = await client.getFileContents(target, { format: 'text' })
  if (typeof content !== 'string') {
    throw new Error(`Did not receive string content from ${target}`);
  }

  if (content === webdavErrorMessageReadingDirectory) {
    throw new Error(`Trying to read directory when looking for a file. Please specify a valid file path instead of ${target}`);
  }
  return content;
}

export async function getAllPageFiles() {
  const contentPath = path.join(CMS_ROOT, `content`)
  const files : FileStat[] | ResponseDataDetailed<FileStat[]> = await client.getDirectoryContents(contentPath, {deep: true})
  if (!Array.isArray(files)) {
    throw new Error(`Did not receive files from ${contentPath}`)
  }
  return files.filter( (file: FileStat) => file.type === 'file' && file.basename === 'index.md')
}


export async function getAllNavigationItems() : {href:string, label: string}[] {
  const allPageFiles: FileStat[] = await getAllPageFiles()

  const navItems =  allPageFiles.map(file => {
    const name = pageUrlToName(file.filename)
    return {
      key: name,
      href: `/${name}`,
      label: capitalizeFirstLetter(name)
    }
  }
  )
  
  return navItems
}