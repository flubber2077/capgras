import fsp from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { ThereWasImage } from './imageFile'

const CONTENT_PATH = path.join(process.cwd(), 'src/content')

export const getCollections = async () => fsp.readdir(CONTENT_PATH)

export const getPostFilePaths = async (folder: string) => {
  const dirFiles = await fsp.readdir(path.join(CONTENT_PATH, folder))
  return dirFiles.filter((filepath) => filepath.includes('.mdx'))
}

export const getSlugsFromFolder = async (folder: string) => {
  const filenames = await getPostFilePaths(folder)
  return filenames.map((path) => ({ slug: path.replace('.mdx', '') }))
}

export type PoemsFrontmatter = {
  title: string
  firstName: string
  lastName: string
  description: string
}

export const getMDX = async (folder: string, slug: string) => {
  const postFilePath = path.join(CONTENT_PATH, folder, `${slug}.mdx`)
  const source = await fsp.readFile(postFilePath)
  const mdxData = await compileMDX<PoemsFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: { Image, ThereWasImage }
  })
  return { ...mdxData, slug }
}

export const getMetadataOfVolume = async (folder: string) => {
  const fileNames = await getSlugsFromFolder(folder)
  const pData = fileNames.map((fileInfo) => getMDX(folder, fileInfo.slug))
  const data = await Promise.all(pData)
  const metadataArr = data.map((data) => {
    const { frontmatter, slug } = data
    return { frontmatter, slug }
  })
  return metadataArr
}
