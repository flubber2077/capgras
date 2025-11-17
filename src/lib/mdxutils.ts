import fsp from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { ThereWasImage } from './imageFile';
import PoemData from '@/interfaces/poem';
import fs from 'fs';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');
const isNumber = (name: string) => parseInt(name, 10);

const getPostFilePaths = async (folder: string) => {
  const dirFiles = await fsp.readdir(path.join(CONTENT_PATH, folder));
  return dirFiles.filter((filepath) => filepath.includes('.mdx'));
};

export const getTitlesFromVolume = async (volume: string) => {
  const filenames = await getPostFilePaths(volume);
  return filenames.map((path) => ({ title: path.replace('.mdx', '') }));
};

export const getMDX = async ({
  volume,
  urlTitle,
}: {
  volume: string;
  urlTitle: string;
}) => {
  const postFilePath = path.join(CONTENT_PATH, volume, urlTitle) + '.mdx';
  const source = await fsp.readFile(postFilePath);
  const mdxData = await compileMDX<PoemData>({
    source,
    options: { parseFrontmatter: true },
    components: { Image, ThereWasImage },
  });
  return { ...mdxData, volume, urlTitle };
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
    const fileInfos = await getTitlesFromVolume(volume);
    const promisePoemsInVolume = fileInfos.map(async (fileInfo) => {
      const { frontmatter, urlTitle } = await getMDX({
        volume,
        urlTitle: fileInfo.title,
      });
      return { frontmatter, volume, urlTitle };
    });
    const poemsInVolume = await Promise.all(promisePoemsInVolume);

    return poemsInVolume;
  });
  return await Promise.all(thing);
};

/** should be outdated? hopefully good to remove soon */
export const getMetadataOfVolume = async (volume: string) => {
  const fileNames = await getTitlesFromVolume(volume);
  const pData = fileNames.map((fileInfo) => getMDX({volume, urlTitle: fileInfo.title}));
  return Promise.all(pData);
};
