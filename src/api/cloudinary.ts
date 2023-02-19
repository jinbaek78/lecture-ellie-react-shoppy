import axios from 'axios';

const httpClient = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`,
});

export async function getImageURL(imageFile: File) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET
  );
  try {
    const { secure_url: imageURL } = (await httpClient.post('/', formData))
      .data;
    return imageURL;
  } catch (err) {
    console.error(err);
  }
}
