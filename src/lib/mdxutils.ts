import fsp from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { ThereWasImage } from './imageFile';
import PoemData from '@/interfaces/poem';
import fs from 'fs';
import { pick } from 'es-toolkit';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');
const isNumber = (name: string) => parseInt(name, 10);

const getPostFilePaths = async (folder: string) => {
  const dirFiles = await fsp.readdir(path.join(CONTENT_PATH, folder));
  return dirFiles.filter((filepath) => filepath.includes('.mdx'));
};

export const getSlugsFromFolder = async (folder: string) => {
  const filenames = await getPostFilePaths(folder);
  return filenames.map((path) => ({ slug: path.replace('.mdx', '') }));
};

export const getMDX = async (folder: string, slug: string) => {
  const postFilePath = path.join(CONTENT_PATH, folder, `${slug}.mdx`);
  const source = await fsp.readFile(postFilePath);
  const mdxData = await compileMDX<PoemData>({
    source,
    options: { parseFrontmatter: true },
    components: { Image, ThereWasImage },
  });
  return { ...mdxData, slug };
};

/** function for getting all info for volumes page */
export const getMetadataOfAllVolumes = async () => {
  // this should be subdivided into a function to get the data and a function for coercing the data
  const volumesPath = path.join(CONTENT_PATH);
  const volumes = fs
    .readdirSync(volumesPath)
    .filter(isNumber)
    // this sorting function throws subdivision of tasks off but is crucial and easiest to conceptualize here
    .toSorted((a, b) => Number(b) - Number(a));
  const thing = volumes.map(async (volume) => {
    const fileInfos = await getSlugsFromFolder(volume);
    const promisePoemsInVolume = fileInfos.map(async (fileInfo) => {
      const { frontmatter, slug } = await getMDX(volume, fileInfo.slug);
      return { frontmatter, slug };
    });
    const poemsInVolume = await Promise.all(promisePoemsInVolume);

    return poemsInVolume;
  });
  return await Promise.all(thing);
};

/** should be outdated? hopefully good to remove soon */
export const getMetadataOfVolume = async (folder: string) => {
  const fileNames = await getSlugsFromFolder(folder);
  const pData = fileNames.map((fileInfo) => getMDX(folder, fileInfo.slug));
  const data = await Promise.all(pData);
  return data.map((data) => pick(data, ['frontmatter', 'slug']));
};
