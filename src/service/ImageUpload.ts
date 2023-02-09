import axios, { AxiosInstance } from 'axios';

export interface IimageUpload {
  upload: (file: File, callback: (imgURL: string) => void) => Promise<any>;
}
export default class ImageUpload {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
    });
  }

  async upload(file: File, callback: (imgURL: string) => void) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post('/', formData, {
        params: {
          upload_preset: import.meta.env.VITE_UNSIGNED_PRESET_NAME,
        },
      })
      .then((res) => {
        if (res) {
          const imgURL = res.data['secure_url'];
          // const converted = this.convertToThumbnailURL(imgURL);
          // console.log('converted: ', converted);
          // callback(converted);
          callback(imgURL);
        }
      });
  }

  // private convertToThumbnailURL(url: string) {
  //   const splited = url.split('upload');
  //   const size = 'c_thumb,w_200,g_face';
  //   return `${splited[0]}upload/${size}${splited[1]}`;
  // }
}
