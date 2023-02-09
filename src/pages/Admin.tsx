import { ChangeEvent, FormEvent, useState } from 'react';
import InputFiledRow from '../components/InputFiledRow';
import { ProductType, useProducts } from '../context/ProductsContext';
import { IimageUpload } from '../service/ImageUpload';

const MESSAGE_REGISTER_START = 'Product registration in progress.';
const MESSAGE_REGISTER_SUCCESS = '✅Product has successfully registered';
const MESSAGE_REGISTER_FAIL =
  '❌Product registration has failed. something went wrong';
const MESSAGE_WARNING_IMAGE = 'Please, choose the image file';

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
  const [message, setMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const { addProduct } = useProducts();
  const handleTextChange = (e: FormEvent<HTMLFormElement>) => {
    const InputElement = e.target as HTMLInputElement;
    if (InputElement.name === 'file') {
      return;
    }

    setProductInfo({ ...productInfo, [InputElement.name]: InputElement.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (imgFile) {
      setMessage(MESSAGE_REGISTER_START);
      imageUploader.upload(imgFile, (url) => {
        addProduct({ ...productInfo, imgURL: url }, () => formElement.reset());
        setMessage(MESSAGE_REGISTER_SUCCESS);
        setTimeout(() => {
          setMessage('');
          setImgFile(null);
        }, 1300);
      });
      return;
    }

    setWarningMessage(MESSAGE_WARNING_IMAGE);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files![0];
    setImgFile(selectedFile);
    warningMessage && setWarningMessage('');
  };

  return (
    <div className="flex flex-col h-full relative">
      <div>
        <p className="text-2xl text-center p-2">Register new Product </p>
        {imgFile && (
          <img
            className="m-auto p-1 pb-2"
            src={URL.createObjectURL(imgFile)}
            width={350}
            height={300}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} onChange={handleTextChange}>
        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200">
          <input
            type="file"
            name="file"
            className="w-full"
            onChange={handleImageChange}
          />
        </div>
        <InputFiledRow placeholder="name" name="name" />
        <InputFiledRow placeholder="price" name="price" />
        <InputFiledRow placeholder="category" name="category" />
        <InputFiledRow placeholder="description" name="description" />
        <InputFiledRow placeholder="options(use comma ,)" name="options" />

        <button
          className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2  bg-[#4abad9]"
          type="submit"
        >
          <p className="text-white font-bold w-full justify-center">
            Register Product
          </p>
        </button>
        {message && (
          <>
            <div className="text-2xl text-center absolute top-0 left-0 z-10 backdrop-blur-2xl bg-white/40 w-full h-full flex justify-center items-center">
              <p>{message}</p>
            </div>
          </>
        )}
        {warningMessage && (
          <p className="text-lg text-center text-red-500">{warningMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Admin;
