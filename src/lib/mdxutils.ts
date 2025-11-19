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

export const getTitlesFromVolume = (volume: string) =>
  fs
    .readdirSync(path.join(CONTENT_PATH, volume))
    .filter((path) => path.includes('.mdx'));

export const getMDX = async ({ volume, urlTitle }: PoemLocation) => {
  const postFilePath = path.join(CONTENT_PATH, volume, urlTitle);
  const source = await fsp.readFile(postFilePath);
  const mdxData = await compileMDX<PoemData>({
    components: { Image, ThereWasImage },
    options: { parseFrontmatter: true },
    source,
  });
  return { ...mdxData, urlTitle, volume };
};

/** function for getting all info for volumes page */
export const getDataOfAllVolumes = () => {
  const volumes = fs
    .readdirSync(path.join(CONTENT_PATH))
    .filter((name) => parseInt(name, 10))
    .toSorted((a, b) => Number(b) - Number(a));

  const volumeDataPromises = volumes.map((volume) =>
    getDataOfVolume(volume),
  );
  return Promise.all(volumeDataPromises);
};

export const getDataOfVolume = (volume: string) => {
  const filenames = getTitlesFromVolume(volume);
  const filesInVolumePromises = filenames.map((fileInfo) =>
    getMDX({ urlTitle: fileInfo, volume }),
  );
  return Promise.all(filesInVolumePromises);
};
