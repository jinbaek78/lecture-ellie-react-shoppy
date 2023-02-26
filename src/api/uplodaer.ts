export async function uploadImage(file: File) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET);
  return fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
