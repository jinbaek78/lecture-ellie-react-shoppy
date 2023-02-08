import { ChangeEvent, FormEvent, useState } from 'react';
import { ProductType, useProducts } from '../context/ProductsContext';
import { IimageUpload } from '../service/ImageUpload';

const emptyProduct = {
  imgURL: '',
  name: '',
  price: 0,
  category: '',
  description: '',
  options: '',
  id: '',
};
type AdminProps = {
  imageUploader: IimageUpload;
};
const Admin = ({ imageUploader }: AdminProps) => {
  const [productInfo, setProductInfo] = useState<ProductType>(emptyProduct);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const { addProduct } = useProducts();
  const handleValuesChange = (e: FormEvent<HTMLFormElement>) => {
    const InputElement = e.target as HTMLInputElement;
    setProductInfo({ ...productInfo, [InputElement.name]: InputElement.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (imgFile) {
      imageUploader.upload(imgFile, (url) => {
        addProduct({ ...productInfo, imgURL: url }, () => formElement.reset());
      });
    }
    console.log('There is no img file yet');
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files![0];
    setImgFile(selectedFile);
  };
  return (
    <div className="flex flex-col h-full">
      <div>
        <p className="text-2xl text-center p-2">Register new Product </p>
        {imgFile && (
          <img
            className="m-auto p-1 pb-2"
            src={URL.createObjectURL(imgFile)}
            width={350}
            height={500}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} onChange={handleValuesChange}>
        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200">
          <input
            type="file"
            name="imgURL"
            className="w-full"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="name"
            name="name"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="price"
            name="price"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="category"
            name="category"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="description"
            name="description"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="options(use comma ,)"
            name="options"
          />
        </div>

        <button
          className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2  bg-[#4abad9]"
          type="submit"
        >
          <p className="text-white font-bold w-full justify-center">
            Register Product
          </p>
        </button>
      </form>
    </div>
  );
};

export default Admin;
