import type { SyntheticEvent } from 'react';

interface addDefaultImageProps {
  width: number;
  height: number;
}

export const addDefaultImage = (
  event: SyntheticEvent<HTMLImageElement, Event>,
  { width, height }: addDefaultImageProps,
) => {
  event.currentTarget.srcset = `https://placehold.co/${width}x${height}?text=No+Image`;
};
