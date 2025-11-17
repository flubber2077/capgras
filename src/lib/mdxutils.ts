import fsp from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { ThereWasImage } from './imageFile';
import type PoemData from '@/interfaces/poem';
import fs from 'fs';

export interface PoemLocation {
  volume: string;
  urlTitle: string;
}

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

const getPostFilePaths = async (folder: string) => {
  const dirFiles = await fsp.readdir(path.join(CONTENT_PATH, folder));
  return dirFiles.filter((filepath) => filepath.includes('.mdx'));
};

export const getTitlesFromVolume = async (volume: string) => {
  const filenames = await getPostFilePaths(volume);
  return filenames.map((path) => ({ title: path.replace('.mdx', '') }));
};

export const getMDX = async ({ volume, urlTitle }: PoemLocation) => {
  const postFilePath = path.join(CONTENT_PATH, volume, urlTitle);
  const source = await fsp.readFile(`${postFilePath}.mdx`);
  const mdxData = await compileMDX<PoemData>({
    components: { Image, ThereWasImage },
    options: { parseFrontmatter: true },
    source,
  });
  return { ...mdxData, urlTitle, volume };
};

/** function for getting all info for volumes page */
export const getMetadataOfAllVolumes = () => {
  // this should be subdivided into a function to get the data and a function for coercing the data
  const volumesPath = path.join(CONTENT_PATH);
  const volumes = fs
    .readdirSync(volumesPath)
    .filter((name) => parseInt(name, 10))
    // this sorting function throws subdivision of tasks off but is crucial and easiest to conceptualize here
    .toSorted((a, b) => Number(b) - Number(a));
  const thing = volumes.map(async (volume) => {
    const fileInfos = await getTitlesFromVolume(volume);
    const promisePoemsInVolume = fileInfos.map(async (fileInfo) => {
      const { frontmatter, urlTitle } = await getMDX({
        urlTitle: fileInfo.title,
        volume,
      });
      return { frontmatter, urlTitle, volume };
    });
    const poemsInVolume = await Promise.all(promisePoemsInVolume);

    return poemsInVolume;
  });
  return Promise.all(thing);
};

/** should be outdated? hopefully good to remove soon */
export const getMetadataOfVolume = async (volume: string) => {
  const fileNames = await getTitlesFromVolume(volume);
  const pData = fileNames.map((fileInfo) =>
    getMDX({ urlTitle: fileInfo.title, volume }),
  );
  return Promise.all(pData);
};
