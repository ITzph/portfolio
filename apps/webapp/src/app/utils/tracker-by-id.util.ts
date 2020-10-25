export const trackByIdOrIndex = (index: number, photo: { id: number | string }) => {
  if (photo) {
    return photo.id;
  }

  return index;
};
