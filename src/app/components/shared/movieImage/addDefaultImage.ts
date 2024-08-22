interface addDefaultImageProps {
  width: number;
  height: number;
}

export const addDefaultImage = (event: any, { width, height }: addDefaultImageProps) => {
  event.target.srcset = `https://placehold.co/${width}x${height}?text=No+Image`;
};
