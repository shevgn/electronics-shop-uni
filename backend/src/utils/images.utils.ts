export const generateImageUrl = (productName: string, name: string) => {
  const cloudName = "dxkpbw96m";
  const folder = "products";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${productName}/${name}`;
};
