export const trackByIdOrIndex = (index: number, meme: { id: number | string }) => {
  if (meme) {
    return meme.id;
  }

  return index;
};
