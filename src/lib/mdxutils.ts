import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';

import type { VolumeMetadata } from '@/interfaces/metadata';
import type PoemData from '@/interfaces/poem';

import { ThereWasImage } from './imageFile';

export interface PoemLocation {
  volume: string;
  urlTitle: string;
}

const CONTENT_PATH = path.join('./src/content');

const getTitlesFromVolume = (volume: string) =>
  fs
    .readdirSync(path.join(CONTENT_PATH, volume))
    .filter((path) => path.includes('.mdx'));

const getMetadataFromVolume = async (volume: string) => {
  try {
    const data = await fsp.readFile(`./src/content/${volume}/@meta.json`, {
      encoding: 'utf8',
    });
    return JSON.parse(data) as VolumeMetadata;
  } catch {
    return undefined;
  }
};

export const getMDX = async ({
  volume,
  fileTitle,
}: {
  volume: string;
  fileTitle: string;
}) => {
  const postFilePath = path.join(CONTENT_PATH, volume, fileTitle);
  const source = await fsp.readFile(postFilePath);
  const mdxData = await compileMDX<PoemData>({
    components: { Image, ThereWasImage },
    options: { parseFrontmatter: true },
    source,
  });
  const urlTitle = fileTitle.replace('.mdx', '');
  return { ...mdxData, urlTitle, volume, fileTitle };
};

/** function for getting all info for volumes page */
export const getDataOfAllVolumes = () => {
  // gets specifically the numbered volume folders and presents them in descending order
  const volumeDataPromises = fs
    .readdirSync(path.join(CONTENT_PATH))
    .map(Number)
    .filter(Boolean)
    .toSorted()
    .toReversed()
    .map((volume) => getDataOfVolume(volume.toString()));

  return Promise.all(volumeDataPromises);
};

export const getDataOfVolume = async (volume: string) => {
  const filesInVolumePromises = getTitlesFromVolume(volume).map((fileInfo) =>
    getMDX({ fileTitle: fileInfo, volume }),
  );
  const volumeMetadata = await getMetadataFromVolume(volume);
  return {
    entries: await Promise.all(filesInVolumePromises),
    meta: volumeMetadata,
  };
};
